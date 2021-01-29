let { spawn }  = require('child_process');
let handler  = async (m, { conn }) => {
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Sedang Mereset Bot...\nMohon tunggu sekitar 1 menit')
    await global.DATABASE.save()
    process.send('reset')
  } else throw '_eeeeeiiittsssss..._'
}
handler.help = ['debounce']
handler.tags = ['host']
handler.command = /^debounce$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

