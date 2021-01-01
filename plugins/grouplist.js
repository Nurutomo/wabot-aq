let handler  = async (m, { conn }) => {
  let txt = Object.keys(conn.chats.dict).filter(v=>/g\.us/.test(v)).map(v=>`${conn.getName(v)}\n${v}`).join`\n\n`
  conn.reply(m.chat, 'List Groups:\n' + txt, m)
}
handler.command = /^(group(s|list))$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

