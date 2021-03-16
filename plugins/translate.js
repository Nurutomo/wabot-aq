const translate = require('translate-google-api')

// made with love, by Ariffb
// wa.me/6283128734012
let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw `contoh: \n\n${usedPrefix}tr id|thankyou\n\nBahasa yang didukung: https://cloud.google.com/translate/docs/languages`

    let [to, trans] = text.split`|`

    if (!to) return conn.reply(m.chat, `Silahkan masukan parameter to\n contoh: \n\n${usedPrefix}tr id|thankyou`, m)
    if (!trans) return conn.reply(m.chat, `Silahkan masukan parameter text\n contoh: \n\n${usedPrefix}tr id|thankyou`, m)

    try {
        const result = await translate(`${trans}`, {
            tld: "cn",
            to: `${to}`,
        })
        m.reply(m.chat, `${text}\n\nTerjemahan: ` + result[0])
    } catch (e) {
        m.reply('_Error!_')
    }

}
handler.help = ['translate'].map(v => v + ' <to>|<teks>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

