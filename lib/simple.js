const fs = require('fs')
const util = require('util')
const FileType = require('file-type')
const fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')

exports.WAConnection = (_WAConnection) => {
	class WAConnection extends _WAConnection {
		constructor(...args) {
		  super(...args)
	  }

    async waitEvent(eventName) {
      return await (new Promise(resolve => this.once(eventName, resolve)))
    }

  	async sendFile(jid, path, filename = '', caption = '', quoted, ptt = false, options) {
	  	const file = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
  		const type = await FileType.fromBuffer(file)
      if (!type) return false
  		let opt = { filename, caption }
  		let mtype = ''
  		if (/image/.test(type.mime)) mtype = MessageType.image
  		else if (/video/.test(type.mime)) mtype = MessageType.video
  		else delete opt.caption
  		if (/audio/.test(type.mime)) {
  			mtype = MessageType.audio
  			opt.ptt = ptt
  		} else if (/pdf/.test(type.ext)) mtype = MessageType.pdf
  		else if (!mtype) {
        mtype = MessageType.document
        opt.mimetype = type.mime
      }
      if (quoted) opt.quoted = quoted
  		return await this.sendMessage(jid, file, mtype, {...opt, ...options})
  	}

  	reply(jid, text, quoted, options) {
  		return this.sendMessage(jid, text, MessageType.extendedText, { quoted, ...options })
  	}
	
	  fakeReply(jid, text = '', fakeJid = this.user.jid, fakeText = '', fakeGroupJid) {
  		return this.reply(jid, text, { key: { fromMe: fakeJid == this.user.jid, participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }})
  	}

  	parseMention(text) {
  		return [...text.matchAll(/@(\d{5,16})/g)].map(v => v[1] + '@s.whatsapp.net')
  	}

	  getName(jid)  {
  		let v = jid === this.user.jid ? this.user : this.contacts[jid] || { notify: jid.replace(/@.+/, '') }
  		return v.name || v.vname || v.notify
  	}

	  async downloadM(m) {
      if (!m) return Buffer.alloc(0)
    	if (!m.message) return Buffer.alloc(0)
	  	if (!m.message[Object.keys(m.message)[0]].url) await this.updateMediaMessage(m)
  		return await this.downloadMediaMessage(m)
  	}
	}

  return WAConnection
}

exports.smsg = (conn, m, hasParent) => {
  if (!m) return m
	if (m.key) {
		m.id = m.key.id
    m.isBaileys = m.id.startsWith('3EB0') && m.id.length === 12
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = m.fromMe ? conn.user.jid : m.isGroup ? m.participant : m.chat
	}
	if (m.message) {
		m.mtype = Object.keys(m.message)[0]
		m.msg = m.message[m.mtype]
		if (m.mtype === 'ephemeralMessage') {
			exports.smsg(conn, m.msg)
			m.mtype = m.msg.mtype
			m.msg = m.msg.msg
		}
		m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
		if (m.quoted) {
		  let type = Object.keys(m.quoted)[0]
			m.quoted = m.quoted[type]
      if (typeof m.quoted == 'string') m.quoted = { text: m.quoted }
			m.quoted.mtype = type
			m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.sender = m.msg.contextInfo.participant
			m.quoted.text = m.quoted.text || m.quoted.caption || ''
			m.getQuotedObj = async () => {
        let q
        await conn.findMessage(m.chat, 25, s => {
          q = s
          return s.key ? false : s.key.id == m.quoted.id
        })
        return q && m.quoted.id == q.key.id ? exports.smsg(q) : false
      }
		}
		m.text = m.msg.text || m.msg.caption || m.msg || ''
	}
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

