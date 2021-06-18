let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}mulaivote* - untuk memulai vote`
    let cekup = conn.vote[id][1]
    let cekde = conn.vote[id][2]
    let voter = cekup.concat(cekde)
    let upvote = `Total: *${cekup.length}*\n`
    for (let up of cekup) {
        upvote += `@${up.split('@')[0]}\n`
    }
    let devote = `Total: *${cekde.length}*\n`
    for (let de of cekde) {
        devote += `@${de.split('@')[0]}\n`
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