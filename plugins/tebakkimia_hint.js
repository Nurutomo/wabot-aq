let handler = async (m, { conn }) => {
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
    let id = m.chat
    if (!(id in conn.tebakkimia)) throw false
    let json = conn.tebakkimia[id][1]
    m.reply('```' + json.name.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_') + '```')
}
handler.command = /^teki$/i
handler.limit = true
module.exports = handler