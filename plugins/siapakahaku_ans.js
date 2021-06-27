let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*who/i.test(m.quoted.text)) return !0
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    if (!(id in conn.siapakahaku)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == conn.siapakahaku[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.siapakahaku[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.result.jawaban.toLowerCase()) {
            global.db.data.users[m.sender].exp += conn.siapakahaku[id][2]
            m.reply(`*Benar!*\n+${conn.siapakahaku[id][2]} XP`)
            clearTimeout(conn.siapakahaku[id][3])
            delete conn.siapakahaku[id]
        } else if (m.text.toLowerCase().endsWith(json.result.jawaban.split` `[1])) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
