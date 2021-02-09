let fetch = require('node-fetch')
let limit = 30
let handler = async function (m, { text, isPrems, isOwner }) {
  if (!text) throw 'Gaada yang dicari :v'
  let res = await fetch(global.API('xteam', '/dl/play', { lagu: text }, 'APIKEY'))
  let { judul, size, thumbnail, url } = await res.json()
  let s = Number(size)
  s = /MB/.test(size) ? s * 1024 : s
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < s
  this.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*Title:* ${judul}
*Filesize:* ${size}
*${isLimit ? 'Pakai ': ''}Link:* ${url}
`.trim(), m)
  if (!isLimit) this.sendFile(m.chat, url, 'audio.mp3', `
*Title:* ${judul}
*Filesize:* ${size}
`.trim(), m)
}
handler.help = ['play <pencarian>']
handler.tags = ['downloader']
handler.command = /^play$/i

handler.exp = 0

module.exports = handler

