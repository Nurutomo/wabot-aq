let handler  = async (m, { conn, args }) => {
  let groups = conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message).map(v => v.jid)
  for (let id of groups) conn.sendMessage(id, args.join` ` + (/broadcast/im.test(args.join` `) ? '' : ('\n' + readMore + '• _*BROADCAST*_ •')), m.mtype, m.msg.contextInfo ? {
    contextInfo: m.msg.contextInfo
  } : {})
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
}
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true
handler.mods = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

