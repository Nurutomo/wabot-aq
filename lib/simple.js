const fs = require('fs')
const util = require('util')
const path = require('path')
const FileType = require('file-type')
const fetch = require('node-fetch')
const { spawn } = require('child_process')
const PhoneNumber = require('awesome-phonenumber')
const { MessageType } = require('@adiwajshing/baileys')

exports.WAConnection = (_WAConnection) => {
	class WAConnection extends _WAConnection {
		constructor(...args) {
		  super(...args)
      this.on('message-new', m => {
        let type = m.messageStubType
        let participants = m.messageStubParameters
        switch (type) {
          case 27:
          case 31:
            this.emit('group-add', { m, type, participants })
            break
          case 28:
          case 32:
            this.emit('group-leave', { m, type, participants })
            break
          case 40:
          case 41:
          case 45:
          case 46:
            this.emit('call', {
              type, participants,
              isGroup: type == 45 || type == 46,
              isVideo: type == 41 || type == 46
            })
            break
        }
      })

      if (!Array.isArray(this._events['CB:action,add:relay,message'])) this._events['CB:action,add:relay,message'] = [this._events['CB:action,add:relay,message']]
      else this._events['CB:action,add:relay,message'] = [this._events['CB:action,add:relay,message'].pop()]
      this._events['CB:action,add:relay,message'].unshift(async function (json) {
        try {
          let m = json[2][0][2]
          if (m.message && m.message.protocolMessage && m.message.protocolMessage.type == 0) {
            let key = m.message.protocolMessage.key
            let c = this.chats.get(key.remoteJid)
            let a = c.messages.dict[`${key.id}|${key.fromMe ? 1 : 0}`]
            let participant = key.fromMe ? this.user.jid : a.participant ? a.participant : key.remoteJid
            let WAMSG = a.constructor
            this.emit('message-delete', { key, participant, message: WAMSG.fromObject(WAMSG.toObject(a)) })
          }
        } catch (e) {}
      })
	  }

    async copyNForward(jid, message, forceForward = false, options = {}) {
      let mtype = Object.keys(message.message)[0]
      let content = await this.generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != MessageType.text) context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
         ...context,
         ...content[ctype].contextInfo
      }
      const waMessage = await this.prepareMessageFromContent(jid, content, options)
      await this.relayWAMessage(waMessage)
      return waMessage
    }

    async cMod(jid, message, text = '', sender = this.user.jid, options = {}) {
      let M = message.constructor
      let copy = M.fromObject(M.toObject(message))
      let mtype = Object.keys(copy.message)[0]
      let msg = copy.message[mtype]
      if (typeof msg === 'string') copy.message[mtype] = text || msg
      else if (msg.caption) msg.caption = text || msg.caption
      else if (msg.text) msg.text = text || msg.text
      if (typeof msg !== 'string') copy.message[mtype] = {...msg, ...options}
      if (copy.participant) sender = copy.participant = sender || copy.participant
      else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      if (message.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || message.key.remoteJid
      else if (message.key.remoteJid.includes('@broadcast')) sender = sender || message.key.remoteJid
      copy.key.remoteJid = sender
      copy.key.fromMe = sender === this.user.jid
      return copy
    }

    async genOrderMessage(message, options) {
      let m = {}
      switch (type) {
        case MessageType.text:
        case MessageType.extendedText:
          if (typeof message === 'string') message = { text: message }
          m.extendedTextMessage = WAMessageProto.ExtendedTextMessage.fromObject(message);
          break
        case MessageType.location:
        case MessageType.liveLocation:
          m.locationMessage = WAMessageProto.LocationMessage.fromObject(message)
          break
        case MessageType.contact:
          m.contactMessage = WAMessageProto.ContactMessage.fromObject(message)
          break
        case MessageType.image:
        case MessageType.sticker:
        case MessageType.document:
        case MessageType.video:
        case MessageType.audio:
          m = await this.prepareMessageMedia(message, type, options)
          break
        case 'orderMessage':
          m.orderMessage = WAMessageProto.OrderMessage.fromObject(message)
      }
      return WAMessageProto.Message.fromObject(m);
    }

    waitEvent(eventName, is = () => true, maxTries = 25) {
      return new Promise((resolve, reject) => {
        let tries = 0
        let on = (...args) => {
          if (++tries > maxTries) reject('Max tries reached')
          else if (is()) {
            this.off(eventName, on)
            resolve(...args)
          }
        }
        this.on(eventName, on)
      })
    }

    sendContact(jid, number, name, quoted, options) {
      // TODO: Business Vcard
      number = number.replace(/[^0-9]/g, '')
      let vcard = `
BEGIN:VCARD
FN:${name}
TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD
`.trim()
      return this.sendMessage(jid, {
        displayName: name,
        vcard
      }, MessageType.contact, { quoted, ...options })
    }

  	async sendFile(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
      let res
	  	let file = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
      if (!Buffer.isBuffer(file)) throw file
      let type = await FileType.fromBuffer(file) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      }
      if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } }
        catch (e) { if (e.json) throw e.json }
      }
  		let opt = { filename, caption }
      if (quoted) opt.quoted = quoted
      if (!type) {
        if (!options.asDocument && typeof file === 'string') {
          delete opt.filename
          delete opt.caption
          return await this.sendMessage(jid, [file, caption].join('\n\n\n').trim(), MessageType.extended, opt)
        } else options.asDocument = true
      }
  		let mtype = ''
      if (options.asSticker) mtype = MessageType.sticker
      else if (!options.asDocument) {
        if (options.force) file = file
        else if (/audio/.test(type.mime)) file = await (ptt ? toPTT : toAudio)(file, type.ext)
   		  else if (/video/.test(type.mime)) file = await toVideo(file, type.ext)
    		if (/image/.test(type.mime)) mtype = MessageType.image
    		else if (/video/.test(type.mime)) mtype = MessageType.video
     		else opt.displayName = opt.caption = filename
        if (options.asGIF && mtype == MessageType.video) mtype = MessageType.gif
     		if (/audio/.test(type.mime)) {
    			mtype = MessageType.audio
          if (!ptt) opt.mimetype = 'audio/mp4'
    			opt.ptt = ptt
    		} else if (/pdf/.test(type.ext)) mtype = MessageType.pdf
    		else if (!mtype) {
          mtype = MessageType.document
          opt.mimetype = type.mime
        }
      } else {
        mtype = MessageType.document
        opt.mimetype = type.mime
      }
      delete options.asDocument
      delete options.asSticker
      if (!opt.caption) delete opt.caption
  		return await this.sendMessage(jid, file, mtype, {...opt, ...options})
  	}

  	reply(jid, text, quoted, options) {
  		return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : this.sendMessage(jid, text, MessageType.extendedText, { quoted, ...options })
  	}
	
	  fakeReply(jid, text = '', fakeJid = this.user.jid, fakeText = '', fakeGroupJid, options) {
  		return this.reply(jid, text, { key: { fromMe: fakeJid == this.user.jid, participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options})
  	}

  	parseMention(text) {
  		return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
  	}

	  getName(jid)  {
  		let v = jid === '0@s.whatsapp.net' ? {
        jid,
        vname: 'WhatsApp'
      } : jid === this.user.jid ?
        this.user :
        this.contactAddOrGet(jid)
  		return v.name || v.vname || v.notify || PhoneNumber('+' + v.jid.replace('@s.whatsapp.net', '')).getNumber('international')
  	}

	  async downloadM(m) {
      if (!m) return Buffer.alloc(0)
    	if (!m.message) m.message = { m }
	  	if (!m.message[Object.keys(m.message)[0]].url) await this.updateMediaMessage(m)
  		return await this.downloadMediaMessage(m)
  	}
	}

  return WAConnection
}

exports.smsg = (conn, m, hasParent) => {
  if (!m) return m
  let M = m.constructor
	if (m.key) {
		m.id = m.key.id
    m.isBaileys = m.id.startsWith('3EB0') && m.id.length === 12
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = m.fromMe ? conn.user.jid : m.participant ? m.participant : m.key.participant ? m.key.participant : m.chat
	}
	if (m.message) {
		m.mtype = Object.keys(m.message)[0]
		m.msg = m.message[m.mtype]
		if (m.mtype === 'ephemeralMessage') {
			exports.smsg(conn, m.msg)
			m.mtype = m.msg.mtype
			m.msg = m.msg.msg
		}
		let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
		if (m.quoted) {
		  let type = Object.keys(m.quoted)[0]
			m.quoted = m.quoted[type]
      if (['productMessage'].includes(type)) {
	  	  type = Object.keys(m.quoted)[0]
  			m.quoted = m.quoted[type]
      }
      if (typeof m.quoted == 'string') m.quoted = { text: m.quoted }
			m.quoted.mtype = type
			m.quoted.id = m.msg.contextInfo.stanzaId
      m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('3EB0') && m.quoted.id.length === 12 : false
			m.quoted.sender = m.msg.contextInfo.participant
		  m.quoted.fromMe = m.quoted.sender == conn.user.jid
			m.quoted.text = m.quoted.text || m.quoted.caption || ''
		  m.quoted.mentionedJid = m.quoted.contextInfo ? m.quoted.contextInfo.mentionedJid : []
			m.getQuotedObj = async () => {
        if (!m.quoted.id) return false
        let q = await conn.loadMessage(m.chat, m.quoted.id)
      }
      let vM = m.quoted.fakeObj = M.fromObject({
        key: {
          fromMe: m.quoted.fromMe,
          remoteJid: m.chat,
          id: m.quoted.id
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {})
      })
      if (m.quoted.url) m.quoted.download = () => conn.downloadM(vM)
      m.quoted.copy = () => exports.smsg(conn, M.fromObject(M.toObject(vM)))
      m.quoted.forward = (jid, forceForward = false)  => conn.forwardMessage(jid, vM, forceForward)
      m.quoted.copyNForward = (jid, forceForward = false, options = {})  => conn.copyNForward(jid, vM, forceForward, options)
      m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => conn.cMod(jid, vM, text, sender, options)
		}
    if (m.msg.url) m.download = () => conn.downloadM(m)
		m.text = m.msg.text || m.msg.caption || m.msg || ''
    m.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m,  options)
    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
    m.forward = (jid, forceForward = false)  => conn.forwardMessage(jid, m, forceForward)
    m.copyNForward = (jid, forceForward = false, options = {})  => conn.copyNForward(jid, m, forceForward, options)
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => conn.cMod(jid, m, text, sender, options)
	}
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

function toAudio(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, '../tmp', + new Date  + '.' + ext)
    let out = tmp + '.mp3'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i',tmp,
      '-vn',
      '-ac', '2',
      '-b:a','128k',
      '-ar','44100',
      '-f', 'mp3',
      out
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

function toPTT(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, '../tmp', + new Date + '.' + ext)
    let out = tmp + '.opus'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i',tmp,
      '-vn',
      '-c:a','libopus',
      '-b:a','128k',
      '-vbr','on',
      '-compression_level','10',
      out,
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

function toVideo(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, '../tmp', + new Date + '.' + ext)
    let out = tmp + '.mp4'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i', tmp,
      '-c:v','libx264',
      '-c:a','aac',
      '-ab','192k',
      '-ar','44100',
      out
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}
