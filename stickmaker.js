const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
//made by anshul
let handler = async (m, { conn, args, usedPrefix }) => {
    if (args.length == 0) return conn.reply(m.chat, `To use *${usedPrefix}stickmaker*\nPlease type: *${usedPrefix}stickmaker* [Query]\nExample: *${usedPrefix}stickmaker jail*\n\n*List Query:*\n_> gay_\n_> glass_\n_> wasted_\n_> jail_`, m)
    if (args[0] == 'jail' || args[0] == 'gay' || args[0] == 'glass' || args[0] == 'wasted')
try {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada foto'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  let url = await uploadImage(img)
  let stick = `https://some-random-api.ml/canvas/` + args[0] + `?avatar=${url}`
  let stiker = await sticker(null, stick, 'DarkBot', 'Anshul')
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
} catch (e) {
  m.reply('Conversion Failed')
  }
}

handler.help = ['stickmaker (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(stickmaker)$/i
handler.limit = true
handler.group = false
handler.register = true
//made by Anshul
module.exports = handler
