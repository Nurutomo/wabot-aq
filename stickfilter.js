const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
//made by Anshul
let handler = async (m, { conn, args, usedPrefix }) => {
    if (args.length == 0) return conn.reply(m.chat, `To use *${usedPrefix}stickfilter*\nPlease type: *${usedPrefix}stickfilter* [Query]\nExample: *${usedPrefix}stickfilter invert*\n\n*List Query:*\n_> greyscale_\n_> invert_\n_> brightness_\n_> threshold_\n_> sepia_\n_> red_\n_> green_\n_> blue_\n_> blurple_\n_> pixelate_\n_> blur_`, m)
    if (args[0] == 'greyscale' || args[0] == 'invert' || args[0] == 'brightness' || args[0] == 'threshold'|| args[0] == 'sepia'|| args[0] == 'red'|| args[0] == 'green'|| args[0] == 'blue'|| args[0] == 'blurple'|| args[0] == 'pixelate'|| args[0] == 'blur')
  
try {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada foto'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  let url = await uploadImage(img)
  let stick = `https://some-random-api.ml/canvas/` + args[0] + `?avatar=${url}`
  let stiker = await sticker(null, stick, 'Dark', 'BotbyAnshul')
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
} catch (e) {
  m.reply('Conversion Failed')
  }
}

handler.help = ['stickfilter (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(stickfilter)$/i
handler.limit = true
handler.group = false
handler.register = true
//made by Anshul
module.exports = handler
