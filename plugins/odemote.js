let handler = async (m, { conn }) => {
  let users = m.mentionedJid
  if (!users.length) m.reply("tag membernya!")
  else conn.groupDemoteAdmin(m.chat, users)
}
handler.help = ['demote','member','v'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(odemote|omember|ov)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = true

handler.fail = null

module.exports = handler
