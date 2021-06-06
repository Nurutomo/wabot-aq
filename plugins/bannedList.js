let handler = async (m, { conn, usedPrefix }) => {
    let chats = global.DATABASE.data.chats
    let users = global.DATABASE.data.users

    var text = ""
    var i = 1
    for (let jid in chats) {
        if (chats[jid].isBanned) {
            text += `│ ${i}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}\n│ ${jid}`
            i += 1
        }
    }

    var pes = ""
    var n = 1
    for (let jid in users) {
        if (users[jid].banned) {
            pes += `│ ${n}. ${conn.getName(jid, true) == undefined ? 'Unknown' : conn.getName(jid, true)}`
            n += 1
        }
    }
    return conn.reply(m.chat, `┌ *Daftar Chat Terbanned*
│ Total : ${i - 1} Chat
│ \n${text}
└────

┌ *Daftar User Terbanned*
│ Total : ${n - 1} User
│ \n${pes}
└────
`, m)
}
handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i
module.exports = handler
