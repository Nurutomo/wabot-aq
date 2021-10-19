/*
   Silahkan Di Pakek
   Tapi Bantu Rapihin :v
   Buatan: Miaweers
*/

let handler = async (m, { conn, args }) => {
    let bot = conn.user.jid // Bot
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) throw `Foto tidak ditemukan`
        conn.updateProfilePicture(bot, img)
        conn.reply(m.chat, 'Sukses Mengganti Foto Profile Bot!', m)
    }
}
handler.help = ['setbotpp']
handler.command = /^(setbotpp)$/i
handler.owner = true

module.exports = handler
