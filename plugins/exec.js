let syntaxerror = require('syntax-error')
let util = require('util')

let handler  = async (m, { conn, usedPrefix }) => {
  let _return
  let _syntax = ''
  try {
    let exec = new (async () => {}).constructor('print', 'm', 'handler', 'require', 'conn', 'Array', 'process', m.text.replace(/^> /, ''))
    _return = await exec((...args) => {
      console.log(...args)
      conn.reply(m.chat, util.format(...args), m)
    }, m, handler, require, conn, CustomArray, {...process, exit: function exit() { return ':P' }})
  } catch (e) {
    let err = await syntaxerror(m.text.replace(/^> /, ''))
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.reply(m.chat, _syntax + util.format(_return), m)
  }
}
handler.customPrefix = /^> /
handler.command = /(?:)/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}
