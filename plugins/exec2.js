let { execSync } = require('child_process')
let handler = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return
  m.reply(execSync(command.trimStart()  + ' ' + text.trimEnd()) + '')
}
handler.customPrefix = /^[$] /
handler.command = new RegExp
handler.rowner = true
module.exports = handler
