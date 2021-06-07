let fetch = require("node-fetch")

const defaultSubreddit = 'meme'
let handler = async (m, { conn, text }) => {
  let res = await fetch(global.API('https://meme-api.herokuapp.com', '/gimme/' + encodeURI(text || defaultSubreddit), {}))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.url) throw 'Media tidak ditemukan!'
  await conn.sendFile(m.chat, json.url, text, json.title, m)
}
handler.help = ['subreddit <query>']
handler.tags = ['internet']
handler.command = /^(sr|subreddit)$/i

module.exports = handler
