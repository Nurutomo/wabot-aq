let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, participants }) => {
let users = participants.map(u => u.jid)
conn.reply(m.chat, users.map(v => '@' + v.replace(/@.+/, '')).join`\n`, m, {
contextInfo: { mentionedJid: users }
})

}
handler.customPrefix = /(@)/
handler.command = /^everyone|absen$/i
handler.group = true

module.exports = handler
