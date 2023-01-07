let fetch = require("node-fetch")

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const response = await fetch(global.API('https://meme-api.com', '/gimme' + `/${args[0]}` || ''))
    const data = await response.json();
    if (!data.url) throw data.message
    if (!data.nsfw) throw 'Content blocked'
    conn.sendFile(m.chat, data.url, 'subreddit', data.title, m)
}
handler.help = ['subreddit'].map(v => v + ' <subreddit>')
handler.tags = ['internet']
handler.command = /^(sr|subreddit)$/i

module.exports = handler
