let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}mulaivote* - untuk memulai vote`

    let voter = conn.vote[id][1].concat(conn.vote[id][2])
    let upvote = `Total: *${conn.vote[id][1].length}*\n`
    for (let u of conn.vote[id][1]) {
        upvote += `@${u.split`@`[0]}\n`
    }
    let devote = `Total: *${conn.vote[id][2].length}*\n`
    for (let d of conn.vote[id][2]) {
        devote += `@${d.split`@`[0]}\n`
    }
    conn.reply(m.chat, `*「 VOTE 」*

*Alasan:* ${conn.vote[id][0]}

*UPVOTE*
${upvote}

*DEVOTE*
${devote}

*${usedPrefix}hapusvote* - untuk menghapus vote

by ariffb`, m, { contextInfo: { mentionedJid: voter } })
}
handler.help = ['cekvote']
handler.tags = ['vote']
handler.command = /^cekvote$/i
handler.group = true
module.exports = handler