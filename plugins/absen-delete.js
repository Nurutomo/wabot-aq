let handler = async (m, { conn, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return conn.sendButton(m.chat, `Tidak ada absen berlangsung!`, '© wabot-aq', 'Mulai', `${usedPrefix}+absen`, m)
    delete conn.absen[id]
    m.reply(`Absen berhasil dihapus`)
}
handler.help = ['hapusabsen']
handler.tags = ['absen']
handler.command = /^(delete|hapus|-)absen$/i

module.exports = handler