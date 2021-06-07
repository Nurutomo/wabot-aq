const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')
let handler = async (m, { conn, text }) => {
  let [t1, t2] = text.split `|`
  if (!t1) throw 'apa'
  if (!t2) throw 'apa'
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Apa`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(img)
  conn.sendFile(m.chat, `https://api.memegen.link/images/custom/${t1}/${t2}.png?background=${link}`, 'Katanya Game Ini Sangat Menakutkan & Sulit! NAMATIN Granny 3.png', `Udahan yu`, m)
}
handler.help = ['memeg'].map(v => v + '<apa|apa>')
handler.tags = ['tools']
handler.command = /^(memeg)$/i

module.exports = handler
