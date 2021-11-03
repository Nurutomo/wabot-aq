let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  let res = await fetch(global.API('xteam', '/news/detik', {}, 'APIKEY'))
  if (res.status != 200) throw await res.text()
  let json = await res.json()
  if (!json.status) throw json
  conn.sendFile(m.chat, json.thumb, 'detiknews.jpeg', `
_*${json.judul}*_
_${json.tanggal}_\n
${json.artikel}\n\n
${json.url}
  `.trim(), m)
}
handler.help = ['detiknews']
handler.tags = ['fun']

handler.command = /^detik|detiknews$/i


module.exports = handler
