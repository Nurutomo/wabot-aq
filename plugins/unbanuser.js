let handler = async (m, { conn }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu yang mau diunban'
    let users = global.db.data.users
    users[who].banned = false
    conn.reply(m.chat, `Berhasil unbanned`, m)
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^unban$/i
handler.rowner = true

module.exports = handler
