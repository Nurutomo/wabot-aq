let fetch = require("node-fetch")
let handler = async (m, { conn }) => {
let res = await fetch('https://raw.githubusercontent.com/jauhari21/asupan/main/100-renungan.txt')
let txt = await res.text()
let arr = txt.split('\n')
let renungan = arr[Math.floor(Math.random() * arr.length)]
conn.sendFile(m.chat, renungan, 'renungan.jpg', `Sumber : Qara'a`, m) 
}

handler.help = ['renungan']
handler.tags = ['quran']
handler.command = /^renungan$/i
handler.limit = false

module.exports = handler
