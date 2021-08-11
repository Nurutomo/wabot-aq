let fetch = require('node-fetch')
let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix + command} minecraft`
  let res = await fetch(global.API('zeks', '/api/pinimg', {
    q: encodeURI(text)
  }, 'apikey'))
  if (!res.ok) throw await `${res.status} ${res.statusText}`
  let json = await res.json()
  if (!json.status) throw json
  let pint = json.data[Math.floor(Math.random() * json.data.length)];
  conn.sendFile(m.chat, pint, '', `
*Hasil pencarian*
${text}
`.trim(), m)
}
handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i

module.exports = handler
