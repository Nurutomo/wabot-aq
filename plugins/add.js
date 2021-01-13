let handler = async (m, { conn, args }) => {
  let users = args.join` `.split`,`.map(v => v.replace(/\D/g, '') + '@s.whatsapp.net').filter(v => v.length > 20)
  for (let user of users) conn.groupAdd(m.chat, user)
}
handler.help = ['add', '+'].map(v => v + ' nomor,nomor')
handler.tags = ['admin']
handler.command = /^(add|\+)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null
handler.limit = true

module.exports = handler

