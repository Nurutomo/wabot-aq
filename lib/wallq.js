//cewe yang ada di iklan royco bikin ange njing

const { MessageType } = require('@adiwajshing/baileys')
const fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
    if (!text) throw 'apa'
    try {
        let res = await fetch(global.API('https://wall.alphacoders.com/api2.0/','get.php', { auth : '3e7756c85df54b78f934a284c11abe4e', method : 'search', term : text},))
        let json = await res.json()
        let img = json.wallpapers[Math.floor(Math.random() * json.wallpapers.length)].url_image
        conn.sendFile(m.chat, img, MessageType.image, {
            quoted: m, caption: 'kont'
        })
    } catch (e) {
        console.log(e)
        throw 'e'
    }
}
handler.help = ['wallpaperq <query>']
handler.tags = ['internet']
handler.command = /^(wall|wallq)$/i
handler.limit = true

module.exports = handler
