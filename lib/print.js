let { WA_MESSAGE_STUB_TYPES,  MessageType  } = require('@adiwajshing/baileys')
let terminalImage = require('terminal-image')
let chalk = require('chalk')
let fs = require('fs')
let urlRegex = require('url-regex')({ strict: false })
let PhoneNumber = require('awesome-phonenumber')
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
    img = [MessageType.image, 1+MessageType.sticker].includes(m.mtype) ? await terminalImage.buffer(await m.download()) : false
  } catch (e) {
    console.error(e)
  }
  let me = PhoneNumber('+' + conn.user.jid.replace('@s.whatsapp.net', '')).getNumber('international')
  console.log(
    `${chalk.red('%s')} ${chalk.inverse(chalk.yellow('%s'))} ${chalk.inverse(chalk.green('%s'))}\n${chalk.green('%s')} ${chalk.yellow('%s')} ${chalk.blue('to')} ${chalk.green('%s')} ${chalk.inverse(chalk.yellow('%s'))}`,
    me + ' ~' + conn.user.name,
    (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date()).toTimeString(),
    m.messageStubType ? WA_MESSAGE_STUB_TYPES[m.messageStubType] : '',
    sender,
    (m ? m.exp : '?') + (global.DATABASE.data.users[m.sender] ? '|' + global.DATABASE.data.users[m.sender].exp : ''),
    m.chat + (chat ? ' ~' + chat : ''),
    m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'ptt' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
  )
  if (img) console.log(img.trimEnd())
  if (typeof m.text == 'string') {
    let log = m.text
    let mdRegex = /(?<=(?:^|[\s\n])\S?)([*_~]|```)(.+?)\1(?=\S?(?:[\s\n]|$))/g
    let mdFormat = (_, type, text) => {
      let types = {
        _: 'italic',
        '*': 'bold',
        '~': 'strikethrough',
        '```': 'template' // Monospace
      }

      return chalk[types[type]](text.replace(mdRegex, mdFormat))
    }
    log = log
      .replace(mdRegex, mdFormat)
      .replace(urlRegex, url => chalk.blueBright(url))
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + conn.getName(user)))
    console.log(m.error ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
  }
  console.log()
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  delete require.cache[file]
})
