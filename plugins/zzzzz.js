let handler = (m, { conn, usedPrefix, command }) => {
let name = conn.getName(m.sender)
m.reply(`
Maaf ${name},,
Perintah *${m.text}*
tidak terdaftar di ${usedPrefix}menu
`.trim())
}
handler.command = new RegExp

module.exports = handler
