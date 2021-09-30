function handler(m, { text }) {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    m.reply(teks.replace(/[a-z]/gi, v => {
        switch (v.toLowerCase()) {
            case 'a': return 'ka'
            case 'b': return 'tu'
            case 'c': return 'mi'
            case 'd': return 'te'
            case 'e': return 'ku'
            case 'f': return 'lu'
            case 'g': return 'ji'
            case 'h': return 'ri'
            case 'i': return 'ki'
            case 'j': return 'zu'
            case 'k': return 'me'
            case 'l': return 'ta'
            case 'm': return 'rin'
            case 'n': return 'to'
            case 'o': return 'mo'
            case 'p': return 'no'
            case 'q': return 'ke'
            case 'r': return 'shi'
            case 's': return 'ari'
            case 't': return 'ci'
            case 'u': return 'do'
            case 'v': return 'ru'
            case 'w': return 'mei'
            case 'x': return 'na'
            case 'y': return 'fu'
            case 'z': return 'zi'
        }
    }))
}
handler.help = ['Namaninja <teks>']
handler.tags = ['fun']
handler.command =  /^(namaninja|namae)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = false
handler.admin = false
handler.botAdmin = false

module.exports = handler