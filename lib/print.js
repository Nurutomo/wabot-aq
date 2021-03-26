let { WA_MESSAGE_STUB_TYPES,  MessageType  } = require('@adiwajshing/baileys')
let urlRegex = require('url-regex')({ strict: false })
let PhoneNumber = require('awesome-phonenumber')
let terminalImage = global.opts['img'] ? require('terminal-image') : ''
let chalk = require('chalk')
let fs = require('fs')

module.exports = async function (m, conn = {user: {}}) {
  let sender = typeof m.text == 'string' || m.mtype ? [m.sender] : m.messageStubParameters
  sender = sender.map(jid => {
    let name = conn.getName(jid)
    return PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : '')
  }).join(' & ')
  let chat = conn.getName(m.chat)
  let ansi = '\x1b['
  let img
  try {
    if (global.opts['img'])
      img = [MessageType.image, 1+MessageType.sticker].includes(m.mtype) ? await terminalImage.buffer(await m.download()) : false
  } catch (e) {
    console.error(e)
  }
  let filesize = m.msg ?
    m.msg.vcard ?
      m.msg.vcard.length :
      m.msg.fileLength ?
        m.msg.fileLength.low || m.msg.fileLength :
        m.text ?
          m.text.length :
          0
    : m.text ? m.text.length : 0
  let user = global.DATABASE.data.users[m.sender]
  let me = PhoneNumber('+' + conn.user.jid.replace('@s.whatsapp.net', '')).getNumber('international')
  console.log(`
${chalk.redBright('%s')} ${chalk.black(chalk.bgYellow('%s'))} ${chalk.black(chalk.bgGreen('%s'))} ${chalk.magenta('%s |%s %sB]')}
${chalk.green('%s')} ${chalk.yellow('%s%s')} ${chalk.blueBright('to')} ${chalk.green('%s')} ${chalk.black(chalk.bgYellow('%s'))}
`.trim(),
    me + ' ~' + conn.user.name,
    (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date).toTimeString(),
    m.messageStubType ? WA_MESSAGE_STUB_TYPES[m.messageStubType] : '',
    filesize,
    filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1),
    ['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || '',
    sender,
    m ? m.exp : '?',
    user ? '|' + user.exp + '|' + user.limit : '' + ('|' + user.level),
    m.chat + (chat ? ' ~' + chat : ''),
    m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
  )
  if (img) console.log(img.trimEnd())
  if (typeof m.text == 'string') {
    let log = m.text.replace(/\u200e+/g, '')
    let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
    let mdFormat = (depth = 4) => (_, type, text, monospace) => {
      let types = {
        _: 'italic',
        '*': 'bold',
        '~': 'strikethrough'
      }
      text = text || monospace
      let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)))
      // console.log({ depth, type, formatted, text, monospace }, formatted)
      return formatted
    }
    if (log.length < 4096)
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i
        return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
      })
    log = log.replace(mdRegex, mdFormat(4))
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + conn.getName(user)))
    console.log(m.error ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
  }
  switch (m.mtype) {
    case MessageType.document:
      console.log(`📄 ${m.msg.filename || 'Document'}`)
      break
    case MessageType.audio:
      let s = m.msg.seconds
      console.log(`${m.msg.ptt ? '🎤' : '🎵'} ${Math.floor(s / 60).toString().padStart(2, 0)}:${(s % 60).toString().padStart(2, 0)}`)
      break
  }
  console.log()
  // if (m.quoted) console.log(m.msg.contextInfo)
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'lib/print.js'"))
  delete require.cache[file]
})
