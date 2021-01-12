let { execSync } = require('child_process'
let handler = async (m, { conn }) => {
  if (global.conn.user.jid = conn.user.jid) {
    let stdout = exexSync('git pull')
    conn.reply(m.chat, stdout.toString(), m)
  }
}
handler.help = ['update']
handler.tags = ['host']
handler.command = /^update$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

