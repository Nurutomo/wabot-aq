let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  let res = await fetch(global.API('https://fdciabdul.tech', '/api/pinterest', {
    keyword : encodeURI(text)
  }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let kontol = json[Math.floor(Math.random() * json.length)];
  conn.sendFile(m.chat, kontol, '', 'selamat menikmati', m)
}
handler.help = ['pinterest <mengontol>']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
module.exports = handler
