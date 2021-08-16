let webp = require('node-webpmux')
let util = require('util')

let handler = async (m) => {
    if (!m.quoted) return m.reply('Tag stikernya!')
    let q = { message: { [m.quoted.mtype]: m.quoted } }
    if (/sticker/.test(m.quoted.mtype)) {
        let img = new webp.Image()
        await img.load(await m.quoted.download())
        m.reply(util.format(JSON.parse(img.exif.slice(22).toString())))
    }
}
handler.help = ['getexif']
handler.tags = ['sticker']

handler.command = ['getexif']

module.exports = handler
