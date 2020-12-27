let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, args }) => {
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  conn.sendMessage(m.chat, args.join` `, MessageType.extendedText, { contextInfo: { mentionedJid: users } })
}
handler.command = /^(pengumuman|announce|hiddentag|hidetag)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = false

handler.fail = null

module.exports = handler

