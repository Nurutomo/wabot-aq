let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  let res = await fetch(global.API('https://fdciabdul.tech', '/api/pinterest', {
    keyword : encodeURI(text)
  }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let pint = json[Math.floor(Math.random() * json.length)];
  conn.sendFile(m.chat, pint, '', `
*Hasil pencarian*
${text}
`.trim(), m)
}
handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS dan Ftwrr
module.exports = handler
