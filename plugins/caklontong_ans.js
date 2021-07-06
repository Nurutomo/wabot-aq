let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*calo/i.test(m.quoted.text)) return !0
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    if (!(id in conn.caklontong)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == conn.caklontong[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.caklontong[id][1]))
        if (m.text.toLowerCase() == json.result.jawaban.toLowerCase()) {
            global.db.data.users[m.sender].exp += conn.caklontong[id][2]
            m.reply(`*Benar!*\n+${conn.caklontong[id][2]} XP\n${json.result.deskripsi}`)
            clearTimeout(conn.caklontong[id][3])
            delete conn.caklontong[id]
        } else if (m.text.toLowerCase().endsWith(json.result.jawaban.split` `[1])) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
