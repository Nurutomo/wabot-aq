let handler = async (m, { conn, usedPrefix, command }) => {

  await m.reply(`
*bye bye teman-teman saya keluar dari grup ini 😓*
`.trim())

 conn.groupLeave(m.chat)
}
handler.help = ['leavegc']
handler.tags = ['group']

handler.command = /^leavegc$/i

handler.group = true
handler.owner = true

module.exports = handler 
