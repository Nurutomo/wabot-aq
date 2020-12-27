let handler = async (m, { conn, args }) => {
  let users = m.mentionedJid
  conn.groupRemove(m.chat, users)
}
handler.command = /^(kick|\-)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler

