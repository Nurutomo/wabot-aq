let { execSync } = require('child_process')
let handler = async (m, { conn, isOwner }) => {
  if (!isOwner) return
  if (global.conn.user.jid != conn.user.jid) return
  m.reply(execSync(m.text.slice(2)))
}
handler.customPrefix = /^$$ $/
handler.command = new RegExp
module.exports = handler
