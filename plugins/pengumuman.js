let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, participants }) => {
  let users = participants.map(u => u.jid)
  conn.reply(m.chat, text, m, { contextInfo: { mentionedJid: users } })
}
handler.help = ['pengumuman','announce','hidetag'].map(v => v + ' [teks]')
handler.tags = ['group']
handler.command = /^(pengumuman|announce|hiddentag|hidetag)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler

