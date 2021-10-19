let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} kejadian`
    let res = await fetch(`https://alkitab.me/search?q=${encodeURIComponent(text)}`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
        }
    })
    if (!res.ok) throw await res.text()
    let html = await res.text()
    let { document } = new JSDOM(html).window
    let result = [...document.querySelectorAll('div.vw')].map(el => {
        let a = el.querySelector('a')
        return {
            teks: el.querySelector('p'),
            link: a.href,
            title: a.textContent.trim()
        }
    })

    m.reply(result.map(v => `${v.title}\n${v.teks}`).join('\n────────\n'))
}
handler.help = ['alkitab'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^(alkitab)$/i

module.exports = handler