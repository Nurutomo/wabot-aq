// Made By github.com/TOXIC-DEVIL
let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan app nama!`
  let res = await fetch(global.API('zeks', '/api/happymod', { q: text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let { title, url, rating, thumb } = json.results[0]
let happymod = `✨️ *Title:* ${title}
💌️ *Rating:* ${rating}
🌐️ *URL*: ${url}\n\n@TOXIC-DEVIL`

  await conn.sendFile(m.chat, thumb, '', happymod, m)
}
handler.help = ['happymod'].map(v => v + ' <apa>')
handler.tags = ['internet']
handler.command = /^(mod|happymod)$/i

module.exports = handler

// Made By github.com/TOXIC-DEVIL
