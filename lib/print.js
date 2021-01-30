let { WA_MESSAGE_STUB_TYPES, URL_REGEX, MessageType  } = require('@adiwajshing/baileys')
let terminalImage = require('terminal-image')
let chalk = require('chalk')

module.exports = async function (m, conn = {user: {}}) {
  let sender = typeof m.text == 'string' || m.mtype ? [m.sender] : m.messageStubParameters
  sender = sender.map(v => v.split`@`[0] + (conn.getName(v) ? ' ~' + conn.getName(v) : '')).join` & `
  let chat = conn.getName(m.chat)
  let ansi = '\x1b['
  let img
  try {
    img = [MessageType.image, 1+MessageType.sticker].includes(m.mtype) ? await terminalImage.buffer(await conn.downloadM(m)) : false
  } catch (e) {
    console.error(e)
  }
  console.log(
    `${chalk.red('%s')} ${chalk.black(chalk.bgYellow('%s'))} ${chalk.black(chalk.bgGreen('%s'))}\n${chalk.green('%s')} ${chalk.yellow('%s')} ${chalk.blue('to')} ${chalk.green('%s')} ${chalk.black(chalk.bgYellow('%s'))}`,
    (conn.user.jid + ' ~' + conn.user.name).replace('@s.whatsapp.net', ''),
    (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date()).toTimeString(),
    m.messageStubType ? WA_MESSAGE_STUB_TYPES[m.messageStubType] : '',
    sender,
    (m ? m.exp : '?') + (global.DATABASE.data.users[m.sender] ? '|' + global.DATABASE.data.users[m.sender].exp : ''),
    m.chat + (chat ? ' ~' + chat : ''),
    m.mtype ? m.mtype.replace(/message$/i, '') : ''
  )
  if (img) console.log(img.trimEnd())
  if (typeof m.text == 'string') {
    let log = m.text
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blue('@' + conn.getName(user)))
    log = log
      .replace(RegExp('(https?:\\/\\/)?' + URL_REGEX.toString().slice(1, -4), URL_REGEX.flags), chalk.blue('$&'))
      .replace(/(?<=(?:^|\s|\n|\*|~))_(.+?)_(?=(?:$|\s|\n|\*|~))/g, `${ansi}3m$1${ansi}23m`) // Italic
      .replace(/(?<=(?:^|\s|\n|_|~))\*(.+?)\*(?=(?:$|\s|\n|_|~))/g, `${ansi}1m$1${ansi}22m`) // Bold
      .replace(/(?<=(?:^|\s|\n|\*|_))~(.+?)~(?=(?:$|\s|\n|\*|_))/g, `${ansi}9m$1${ansi}29m`) // Strikethrough
      .replace(/(?<=(?:^|\s|\n|\*|_|~))\x60{3}(.+?)\x60{3}(?=(?:$|\s|\n|\*|_|~))/gm, `$1`) // Monospace (...)
    console.log(m.error ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
  }
  console.log()
}

delete require.cache[require.resolve(__filename)]
