let handler = async (m, { conn }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu yang mau dibanned'
    let users = global.db.data.users
    users[who].banned = true
    conn.reply(m.chat, `Berhasil banned`, m)
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.rowner = true

module.exports = handler
