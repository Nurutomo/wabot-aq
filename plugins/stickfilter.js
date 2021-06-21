//made by Anshul
const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, args, usedPrefix }) => {
    if (args.length == 0) return conn.reply(m.chat, `To use *${usedPrefix}stickfilter*\nPlease type: *${usedPrefix}stickfilter* [Query]\nExample: *${usedPrefix}stickfilter invert*\n\n*List Query:*\n_> greyscale_\n_> invert_\n_> brightness_\n_> threshold_\n_> sepia_\n_> red_\n_> green_\n_> blue_\n_> blurple_\n_> pixelate_\n_> blur_`, m)
    if (args == 'greyscale' || args == 'invert' || args == 'brightness' || args == 'threshold'|| args == 'sepia'|| args == 'red'|| args == 'green'|| args == 'blue'|| args == 'blurple'|| args == 'pixelate'|| args == 'blur')
try {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No photo'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} not supported`
  let img = await q.download()
  let url = await uploadImage(img)
  let text = encodeURI(args)
  
let stick = global.API('https://some-random-api.ml/canvas/', text.toLowerCase(), {avatar: url})
  let stiker = await sticker(null, stick, global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
} catch (e) {
  m.reply('Reply Image Only')
  throw false
  }
}

handler.help = ['stickfilter (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(stickfilter)$/i
handler.limit = true
handler.group = false
handler.register = true
module.exports = handler