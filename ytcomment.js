const uploadImage = require('../lib/uploadImage')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  
try {
  let [text1, text2] = text.split('|')
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No photo'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} not supported`
  await m.reply(global.wait)
  let img = await q.download()
  let url = await uploadImage(img)
  let meme = `https://some-random-api.ml/canvas/youtube-comment?avatar=${url}&comment=${text2}&username=${text1}`
  conn.sendFile(m.chat, meme, 'comment.jpg', '©Dark-Bot', m)
} catch (e) {
  m.reply('Conversion Failed')
  }
}

handler.help = ['ytcomment <username>|<comment>']
handler.tags = ['maker']
handler.command = /^(ytcomment)$/i
handler.limit = true
handler.group = false
handler.register = true
module.exports = handler