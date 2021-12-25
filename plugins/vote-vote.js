let handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return conn.sendButton(m.chat, `Tidak ada voting di chat ini!`, '© wabot-aq', 'Mulai', `${usedPrefix}+vote`, conn.vote[id][3])
    let isVote = conn.vote[id][1].concat(conn.vote[id][2])
    const wasVote = isVote.includes(m.sender)
    if (wasVote) throw 'Kamu sudah vote!'
    if (/up/i.test(command)) {
        conn.vote[id][1].push(m.sender)
    } else if (/de/i.test(command)) {
        conn.vote[id][2].push(m.sender)
    }
    let [reason, upvote, devote] = conn.vote[id]
    conn.send2Button(m.chat, `
「 Voting 」

Alasan: ${reason}

╭─「 Upvote 」
│ _Total: ${upvote.length}_
│ ${upvote.map(u => '@' + u.split('@')[0]).join('\n')}
╰────
╭─「 Devote 」
│ _Total: ${devote.length}_
│ ${devote.map(u => '@' + u.split('@')[0]).join('\n')}
╰────
`.trim(), '© wabot-aq', 'Upvote', `${usedPrefix}upvote`, 'Devote', `${usedPrefix}devote`, m)
}
handler.help = ['upvote', 'devote']
handler.tags = ['vote']
handler.command = /^(up|de)vote$/i

module.exports = handler