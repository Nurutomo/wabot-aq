// Pngocok handal

let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'Uhm... Teksnya mana?'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  let res = await fetch(global.API('https://scrap.terhambar.com', '/lirik', {
    word: text
  }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (json.error) throw json.error
  if (!json.result) throw json
  m.reply(`
${json.result.lirik}
`.trim())
}
handler.help = ['lirik'].map(v => v + ' <teks>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler
