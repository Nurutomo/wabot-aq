let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK JUDUL LAGU/i.test(m.quoted.text)) return
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    if (!(id in conn.tebaklagu)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == conn.tebaklagu[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.tebaklagu[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.judul.toLowerCase()) {
            global.DATABASE._data.users[m.sender].exp += conn.tebaklagu[id][2]
            m.reply(`*Benar!*\n+${conn.tebaklagu[id][2]} XP`)
            clearTimeout(conn.tebaklagu[id][3])
            delete conn.tebaklagu[id]
        } else if (m.text.toLowerCase().endsWith(json.judul.split` `[1])) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
}
handler.exp = 0

module.exports = handler