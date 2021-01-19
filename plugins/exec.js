let syntaxerror = require('syntax-error')
let util = require('util')

let handler  = async (m, { conn, usedPrefix, command, text, noPrefix, args, isOwner }) => {
  let _return
  let _syntax = ''
  let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix
  let old = m.exp * 1
  conn.clearAuthInfo = conn.groupLeave = () => {
    throw '_Lu seneng kalo lu diginiin?_'
  }
  let i = 20
  _require = m.fromMe ? require : mod => {
    let banned = [
      'child_process', 'fs'
    ]
    if (banned.includes(mod)) return '_Mau ngapain?_'
    return require(mod)
  }
  try {
    let exec = new (async () => {}).constructor('print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args', 'global', _text)
    _return = await exec((...args) => {
      if (--i < 1) return
      console.log(...args)
      return conn.reply(m.chat, util.format(...args), m)
    }, m, handler, _require, m.fromMe ? conn : { ...conn, deleteChat: conn.clearAuthInfo }, CustomArray, {...process, exit: function exit() { return ':P' }}, args, Object.freeze({ ...global, global: 'Lu mau apa kesini -_-'}))
  } catch (e) {
    let err = await syntaxerror(_text)
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.reply(m.chat, _syntax + util.format(_return), m)
    m.exp = old
  }
}
handler.help = ['> ', '=> ']
handler.tags = ['advanced']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i
handler.owner = false
handler.mods = true
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
