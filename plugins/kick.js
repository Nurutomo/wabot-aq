let handler = async (m, { conn, args }) => {
  let ownerGroup = m.chat.replace(/\-+/, '')
  let users = m.mentionedJid.filter(u => !(u.includes(ownerGroup) || u.includes(conn.user.jid)))
  for (let user of users) await conn.groupRemove(m.chat, [user])
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

