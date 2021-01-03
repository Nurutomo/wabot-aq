let handler  = async (m, { conn, args }) => {
  let groups = conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message).map(v => v.jid)
  for (let id of groups) conn.sendMessage(id, '• Broadcast •\n' + args.join` `, m.mtype, m.msg.contextInfo ? {
    contextInfo: m.msg.contextInfo
  } : {})
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
}
handler.command = /^(broadcastgroup|broadcastgc|bcgroup|bcgc)$/i
handler.owner = true
handler.mods = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

