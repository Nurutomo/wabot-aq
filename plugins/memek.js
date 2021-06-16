let fetch = require("node-fetch")
let handler = async (m, { conn }) => {
  let res = await fetch(global.API('https://some-random-api.ml', '/meme'))
  let json = await res.json()
  conn.sendFile(m.chat, json.image, 'memek.png', json.caption, m)
}

handler.help = ['meme']
handler.tags = ['internet']

handler.command = /^(meme)$/i

handler.group = true

module.exports = handler
