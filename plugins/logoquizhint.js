let handler = async (m, { conn }) => {
    conn.logoquiz = conn.logoquiz ? conn.logoquiz : {}
    let id = m.chat
    if (!(id in conn.logoquiz)) throw false
    let json = conn.logoquiz[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```')
}
handler.command = /^hints$/i

handler.limit = true

module.exports = handler