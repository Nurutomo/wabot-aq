let handler = async (m, { conn }) => {
    conn.tebakirik = conn.tebakirik ? conn.tebakirik : {}
    let id = m.chat
    if (!(id in conn.tebakirik)) throw false
    let json = conn.tebakirik[id][1]
    m.reply('```' + json.jawaban.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^teli$/i
handler.limit = true
module.exports = handler