let handler = async (m, { conn, args }) => {
  let chats = args.length > 0 && /group|gc/i.test(args[0]) ? conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.pin).map(v => v.jid) : [m.chat]
  for (let id of chats) await conn.modifyChat(id, 'delete')
  conn.reply(m.chat, chats.length + ' chat grup telah dibersihkan', m)
}
handler.command = /^(clear|delete)chat$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

