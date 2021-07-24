let fetch = require("node-fetch")

let handler = async (m, { conn, text }) => {
  let res = await fetch(global.API('zeks', '/api/resep-masak', { q : text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.title) throw json
  await conn.sendFile(m.chat, json.thumb, '', `
${json.title}
${json.url}\n
${json.tingkat}
${json.duration}
${json.banyak}\n\n
${json.bahan}
${json.cara}
`.trim(), m)
}
handler.help = ['resep <makanan>', 'masak <makanan>']
handler.tags = ['internet']
handler.command = /^(resep|masak)$/i

module.exports = handler
