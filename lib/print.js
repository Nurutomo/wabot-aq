let { WA_MESSAGE_STUB_TYPES,  MessageType  } = require('@adiwajshing/baileys')
let urlRegex = require('url-regex')({ strict: false })
let PhoneNumber = require('awesome-phonenumber')
let terminalImage = require('terminal-image')
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
    img = [MessageType.image, 1+MessageType.sticker].includes(m.mtype) ? await terminalImage.buffer(await m.download()) : false
  } catch (e) {
    console.error(e)
  }
  let filesize = m.msg && m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength : m.text ? m.text.length : 0
  let user = global.DATABASE.data.users[m.sender]
  let me = PhoneNumber('+' + conn.user.jid.replace('@s.whatsapp.net', '')).getNumber('international')
  console.log(`
${chalk.redBright('%s')} ${chalk.inverse(chalk.yellow('%s'))} ${chalk.inverse(chalk.green('%s'))} ${chalk.magenta('%s |%s %sB]')}
${chalk.green('%s')} ${chalk.yellow('%s%s')} ${chalk.blueBright('to')} ${chalk.green('%s')} ${chalk.inverse(chalk.yellow('%s'))}
`.trim(),
    me + ' ~' + conn.user.name,
    (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date).toTimeString(),
    m.messageStubType ? WA_MESSAGE_STUB_TYPES[m.messageStubType] : '',
    filesize,
    filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1),
    ['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || '',
    sender,
    m ? m.exp : '?',
    user ? '|' + user.exp + '|' + user.limit : '',
    m.chat + (chat ? ' ~' + chat : ''),
    m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
  )
  if (img) console.log(img.trimEnd())
  if (typeof m.text == 'string') {
    let log = m.text
    let mdRegex = /(?<=(?:^|[\s\n])\S?)([*_~]|```)(.+?)\1(?=\S?(?:[\s\n]|$))/g
    let mdFormat = (depth = 4) => (_, type, text) => {
      let types = {
        _: 'italic',
        '*': 'bold',
        '~': 'strikethrough'
      }

      return !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)))
    }
    log = log
      .replace(mdRegex, mdFormat(4))
      .replace(urlRegex, (url, i, text) => {
        let end = url.length + i
        return /\s/.test(text[end]) || end === text.length ? chalk.blueBright(url) : url
      })
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + conn.getName(user)))
    console.log(m.error ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
  }
  console.log()
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'lib/print.js'"))
  delete require.cache[file]
})
