let { WA_MESSAGE_STUB_TYPES, URL_REGEX } = require('@adiwajshing/baileys')
let chalk = require('chalk')

module.exports = function (m, conn = {user: {}}) {
  let sender = typeof m.text == 'string' || m.mtype ? [m.sender] : m.messageStubParameters
  sender = sender.map(v => v.split`@`[0] + (conn.getName(v) ? ' ~' + conn.getName(v) : '')).join` & `
  let chat = conn.getName(m.chat)
  let ansi = '\x1b['
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
  if (typeof m.text == 'string') {
    let log = m.text
      .replace(RegExp('(https?:\\/\\/)?' + URL_REGEX.toString().slice(1, -4), URL_REGEX.flags), chalk.blue('$&'))
      .replace(/(?<=(?:^|\s|\n))_(.+?)_(?=(?:$|\s|\n))/g, `${ansi}3m$1${ansi}23m`) // Italic
      .replace(/(?<=(?:^|\s|\n))\*(.+?)\*(?=(?:$|\s|\n))/g, `${ansi}1m$1${ansi}22m`) // Bold
      .replace(/(?<=(?:^|\s|\n))~(.+?)~(?=(?:$|\s|\n))/g, `${ansi}9m$1${ansi}29m`) // Strikethrough
      .replace(/(?<=(?:^|\s|\n))\x60{3}(.+?)\x60{3}(?=(?:$|\s|\n))/gm, `$1`) // Monospace (...)
    console.log(m.isCommand ? chalk.yellow(log) : log)
    console.log()
  }
}

delete require.cache[require.resolve(__filename)]
