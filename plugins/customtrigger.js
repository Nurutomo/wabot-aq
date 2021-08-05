const uploadImage = require('../lib/uploadImage')
const uploadFile = require('../lib/uploadFile')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
//api down always at night :/
let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw 'Enter Text!!'
  if (text.length > 8) return conn.reply(m.chat, '_Text Too Long! Maximum 8 letters!_', m)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Reply image with caption *${usedPrefix + command} ${text}*`
 try {
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} not supported`
  let img = await q.download()
  let url = await uploadImage(img).catch(e => uploadFile(img))
  let meme = global.API('http://zekais-api.herokuapp.com/', 'customtrigger', {text , image: url})
  let stiker = await sticker(null, meme, global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
 } catch (e) {
   m.reply('Error || Reply with image!')
   throw false
  }
}
handler.help = ['ctrigger <text>']
handler.tags = ['sticker']
handler.command = /^(custom|c)trigger$/i
handler.limit = true
//MADEbyAnshul
module.exports = handler