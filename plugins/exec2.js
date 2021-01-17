let { execSync } = require('child_process')
let handler = async (m, { conn, isOwner, command, text }) => {
  if (!isOwner) return
  if (global.conn.user.jid != conn.user.jid) return
  m.reply(execSync(command + ' ' + text))
}
handler.customPrefix = /^$$ /
handler.command = new RegExp
module.exports = handler
