let { WA_MESSAGE_STUB_TYPES, URL_REGEX } = require('@adiwajshing/baileys')
let chalk = require('chalk')

module.exports = function (m, conn = {user: {}}) {
  let sender = typeof m.text == 'string' || m.mtype ? [m.sender] : m.messageStubParameters
  sender = sender.map(v => v.split`@`[0] + (conn.getName(v) ? ' ~' + conn.getName(v) : '')).join` & `
  let chat = conn.getName(m.chat)
  let ansi = '\x1b['
  console.log(
    `${chalk.red('%s')} ${chalk.bgYellow(chalk.black('%s'))} ${chalk.bgGreen(chalk.black('%s'))}\n${chalk.green('%s')} ${chalk.yellow('%s')} ${chalk.blue('to')} ${chalk.green('%s')} ${chalk.bgYellow(chalk.black('%s'))}`,
    (conn.user.jid + ' ~' + conn.user.name).replace('@s.whatsapp.net', ''),
    (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date()).toTimeString(),
    m.messageStubType ? WA_MESSAGE_STUB_TYPES[m.messageStubType] : '',
    sender,
    (m ? m.exp : '?') + (global.DATABASE.data.users[m.sender] ? '|' + global.DATABASE.data.users[m.sender].exp : ''),
    m.chat + (chat ? ' ~' + chat : ''),
    m.mtype ? m.mtype.replace(/message$/i, '') : ''
  )
  if (typeof m.text == 'string') console.log(
    '%s\n',
    m.text
      .replace(RegExp('(https?:\\/\\/)?' + URL_REGEX.toString().slice(1, -4), URL_REGEX.flags), chalk.blue('$&'))
      .replace(/(^|\s|\n)_(.+)?_($|\s|\n)/g, `$1${ansi}3m$2${ansi}23m$3`)
      .replace(/(^|\s|\n)\*(.+)?\*($|\s|\n)/g, `$1${ansi}1m$2${ansi}22m$3`)
      .replace(/(^|\s|\n)~(.+)?~($|\s|\n)/g, `$1${ansi}9m$2${ansi}29m$3`)
      .replace(/(^|\s|\n)\x60{3}(.+)?\x60{3}($|\s|\n)/g, `$1$2$3`)
  )
}

delete require.cache[require.resolve(__filename)]
