// ariffb - http:/wa.me/6283128734012
const translate = require('translate-google-api')
let handler = async (m, { text, usedPrefix }) => {
    goblok = `contoh:\n${usedPrefix}tr lang teks\n${usedPrefix}tr id thankyou\n\nDaftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages`

    let lang = 'en'
    let text = args.slice(1).join(' ')
    if (!text) throw goblok
    if (args[0].length === 2) lang = args[0]
    else text = args.join(' ')
    if (!text) text = lang

    try {
        const result = await translate(`${text}`, {
            tld: "cn",
            to: `${lang}`,
        })
        m.reply(`To: ${lang}\n\nTerjemahan: ${result[0]}`)
        console.log(result[0])
    } catch (e) {
        throw goblok
    }
}
handler.help = ['translate'].map(v => v + ' <lang> <teks>')
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

