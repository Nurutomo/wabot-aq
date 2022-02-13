let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
if (!text) throw 'Tolong beri saya tautan apa pun, Contoh: #tinyurl https://youtu.be/HInmqcGVUJ4'
let res = await (await fetch(`https://tinyurl.com/api-create.php?url=${text}`)).buffer() 
m.reply(`${res}`)
}
handler.command = /^tinyurl$/i
module.exports = handler
