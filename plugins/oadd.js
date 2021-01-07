let handler = async (m, { conn, args }) => {
  let users = args.join` `.split`,`.map(v => v.replace(/\D/g, '') + '@s.whatsapp.net').filter(v => v.length > 20)
  for (let user of users) conn.groupAdd(m.chat, user)
}
handler.help = ['add', '+'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(oadd|o\+)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = true

handler.fail = null

module.exports = handler
