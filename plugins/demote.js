let handler = async (m, { conn }) => {
  let users = m.mentionedJid
  if (!users.length) m.reply("tag membernya!")
  else conn.groupDemoteAdmin(m.chat, users)
}
handler.help = ['demote','member','↓'].map(v => v + ' @user')
handler.tags = ['admin']
handler.command = /^(demote|member|↓)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler

