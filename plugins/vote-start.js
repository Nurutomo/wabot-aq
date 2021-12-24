let handler = async (m, { conn, text, usedPrefix }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) return conn.send2Button(m.chat, `Masih ada voting di chat ini!`, '© wabot-aq', 'Cek', `${usedPrefix}cekvote`, 'Hapus', `${usedPrefix}-vote`, conn.vote[id][3])
    conn.vote[id] = [
        text,
        [],
        [],
        await conn.send2Button(m.chat, 'Voting dimulai', '© wabot-aq', 'Upvote', `${usedPrefix}upvote`, 'Devote', `${usedPrefix}devote`, m)
    ]
}
handler.help = ['mulaivote [alasan]']
handler.tags = ['vote']
handler.command = /^(start|mulai|\+)vote$/i

module.exports = handler