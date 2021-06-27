let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
    let res = await fetch('https://islamic-api-indonesia.herokuapp.com/api/data/json/ayatkursi')
    let json = await res.json()
    if (!json.result) throw json
    let { arabic, latin, translation, tafsir } = json.result
    let text = `
    ${arabic}
    Latin: ${latin}
    Arti: ${translation}
    Tafsir: ${tafsir}
    `.trim()
    conn.reply(m.chat, text, m)
}
handler.help = ['ayatkursi']
handler.tags = ['internet']

handler.command = /^(ayatkursi)$/i

module.exports = handler 