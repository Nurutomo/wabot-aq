let fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
let res = await fetch('https://raw.githubusercontent.com/Ciel-chann/anime-nsfw-meme/master/shinomiya.json')
if (!res.ok) throw await `${res.status} ${res.statusText}`;
let json = await res.json();
let url = json[Math.floor(Math.random() * json.length)]
await conn.sendButtonImg(m.chat, await (await fetch(url)).buffer(), 'Gw Suka Shinomiya', 'Made By Ciel-Chann & Rimuru-Sama', '➡️Next', '.shinomiya', m)
}
handler.command = /^(shinomiya)$/i
handler.tags = ['anime']
handler.help = ['shinomiya']
module.exports = handler
