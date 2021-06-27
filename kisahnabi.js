let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
    if (!text) return m.reply ('Harap masukkan nama Nabi sebagai parameter!')
    try{
        let res = await fetch('https://islamic-api-indonesia.herokuapp.com/api/data/kisahnabi?nabi=' + encodeURIComponent(text))
        let json = await res.json()
        let { nabi, lahir, tempat, umur, image, kisah, creator } = json

        let pesan = `
        Nabi: ${nabi}
        Lahir: ${lahir}
        Tempat: ${tempat}
        Umur: ${umur}
        Kisah: ${kisah}
        Credit: ${creator}
        `.trim()
        let foto = `${image}`
        conn.sendFile(m.chat, pesan, foto, m)
    }catch (e) {
    }
}
handler.tags = ['internet']
handler.help = ['kisahnabi <nabi>']

handler.command = /^(kisahnabi)$/i

module.exports = handler
