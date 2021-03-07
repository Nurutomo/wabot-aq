let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text}) => {
    if (!text) throw 'Siapa yang mau di banned?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    let users = global.DATABASE._data.users
    users[who].banned = true
    conn.reply(m.chat, `berhasil banned`, m)
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.rowner = true

module.exports = handler
