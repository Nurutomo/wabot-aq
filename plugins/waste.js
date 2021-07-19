/* Codded By TOXIC-DEVIL
## github.com/TOXIC-DEVIL
# Nurutomo/wabot-aq
## Command/Bug-Fixes/Error-Fixes
# Under GPL-3.0 License
TOXIC DEVIL */

let handler = async (m, { conn, text }) => {
  let image = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) throw `membalas gambar atau memberikan keterangan *${usedPrefix + command}*`

  await conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/wasted', {
    avatar: image, // Special Thanks To : some-random-api.ml 
  }), 'wasted.png', 'wasted 😂', m)
}
handler.help = ['wasted (caption|reply media)']
handler.tags = ['maker']

handler.command = /^(wasted)$/i

module.exports = handler
