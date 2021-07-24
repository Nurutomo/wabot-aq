let handler  = async (m, { conn }) => {
  if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, 'Terima kasih sudah menjadi bot :)', m)
  else {
    await conn.reply(m.chat, 'Goodbye bot :\')', m)
    conn.close()
  }
}
handler.help = ['berhenti','stopjadibot']
handler.tags = ['jadibot']
handler.command = /^(berhenti|stopjadibot)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

