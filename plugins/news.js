let fetch = require('node-fetch')
let handler = async (m, { conn, command }) => {
  let res = await fetch(global.API('xteam', '/news/' + command, {}, 'APIKEY'))
  if (res.status != 200) throw await res.text()
  let json = await res.json()
  if (!json.status) throw json
  conn.sendFile(m.chat, json.thumb, 'news.jpeg', `
_*${json.judul}*_
_${json.tanggal}_\n
${json.artikel}\n\n
${json.url}
  `.trim(), m)
}
handler.help = ['detik', 'kompas', 'liputan6', 'tribun', 'jalantikus']
handler.tags = ['berita']

handler.command = /^detik|kompas|liputan6|tribun|jalantikus$/i


module.exports = handler
