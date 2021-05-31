let handler = async (m, { conn, command, args }) => {
  let chats = args.length > 0 && /group|gc/i.test(args[0]) ? conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.pin).map(v => v.jid) : [m.chat]
  let chatsPrivate = args.length > 0 && /chat|private/i.test(args[0]) ? conn.chats.array.filter(v => v.jid.endsWith('.net') && !v.pin).map(v => v.jid) : [m.chat]
  let isDelete = /^(clear|delete)/i.test(command)
  for (let id of chats) {
    if (isDelete) await conn.modifyChat(id, 'delete', {
      includeStarred: false
    }).catch(console.log)
    await conn.modifyChat(id, 'mute', -Math.floor(new Date / 1e3) * 1e3 - 1e3).catch(console.log)
  }
  for (let id of chatsPrivate) {
    if (isDelete) await conn.modifyChat(id, 'delete').catch(console.log)
    await conn.modifyChat(id, 'mute', -Math.floor(new Date / 1e3) * 1e3 - 1e3).catch(console.log)
  }
  conn.reply(m.chat, chats.length + ' chat ' + args[0] + ' telah dib' + (isDelete ? 'ersihkan' : 'isukan selamanya'), m)
}
handler.help = ['deletechat', 'deletechat chat', 'deletechat group', 'mutechat', 'mutechat chat', 'mutechat group']
handler.tags = ['owner']
handler.command = /^(clear|delete|mute)chat$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

