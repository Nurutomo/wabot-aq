let fetch = require("node-fetch")
let handler = async(m, { conn, text }) => {
let res = await fetch(`https://meme-api.herokuapp.com/gimme/${text}`)
let json = await res.json()
if (!json.code)conn.sendFile(m.chat, json.url, '', json.title,m)
	else throw json.message
}
handler.help = ['subreddit <query>']
handler.tags = ['internet']
handler.command = /^(sr|subreddit)$/i
handler.owner = true
handler.mods = true
handler.premium = true

module.exports = handler
