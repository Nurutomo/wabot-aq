let handler = async (m, { conn }) => {
  let users = m.mentionedJid
  if (!users.length) m.reply("tag membernya!")
  else conn.groupMakeAdmin(m.chat, users)
}
handler.help = ['promote','admin','^'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(opromote|oadmin|o\^)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = true

handler.fail = null

module.exports = handler
