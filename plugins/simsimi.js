let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let res = await fetch('https://api.xteam.xyz/simsimi?kata=' + encodeURIComponent(text))
  let json = await res.json()
  if (json.status) m.reply(json.jawaban)
}
handler.help = ['sim', ''].map(v => v + 'simi <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi)$/i

module.exports = handler

