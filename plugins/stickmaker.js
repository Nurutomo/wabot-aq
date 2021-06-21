//made by Anshul
const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, args, usedPrefix }) => {
    if (args.length == 0) return conn.reply(m.chat, `To use *${usedPrefix}stickmaker*\nPlease type: *${usedPrefix}stickmaker* [Query]\nExample: *${usedPrefix}stickmaker jail*\n\n*List Query:*\n_> gay_\n_> glass_\n_> wasted_\n_> jail_\n_> triggered_`, m)
    if (args == 'jail' || args == 'gay' || args == 'glass' || args == 'wasted' || args == 'triggered')
try {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No photo'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} not support`
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

handler.help = ['stickmaker (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(stickmaker)$/i
handler.limit = true
handler.group = false
handler.register = true
module.exports = handler