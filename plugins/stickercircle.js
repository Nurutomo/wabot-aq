const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let fs = require('fs')
let sharp = require('sharp')
let handler = async (m, { conn, usedPrefix }) => {
    const type = Object.keys(m.message)[0]
    const content = JSON.stringify(m.message)
    const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

    if (isMedia && !m.message.videoMessage || isQuotedImage) {
        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        await conn.downloadMediaMessage(encmedia).then(media => {
            ran = getRandom('.webp')
            const roundedCorners = Buffer.from(
                '<svg><rect x="0" y="0" width="600" height="600" rx="300" ry="300"/></svg>'
            )
            sharp(media).resize({
                width: 600,
                height: 600
            }).composite([{
                input: roundedCorners,
                blend: 'dest-in'
            }]).webp().toBuffer().then(async buffer => {
                fs.writeFileSync('./tmp/' + ran, buffer)
                stiker = await sticker(fs.readFileSync('./tmp/' + ran), false, global.packname, global.author)
                conn.sendMessage(m.chat, stiker, MessageType.sticker, { quoted: m })
                fs.unlinkSync('./tmp/' + ran)

            })
        })
    } else throw `kirim/balas gambar dengan caption *${usedPrefix}sc*`

}
handler.help = ['stikercircle (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?c(ircle)?)$/i
handler.limit = true
module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}