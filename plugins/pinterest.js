//Created by Villagerindo, saya masih pemula hehe
const fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
	let text = args.join` `
	if (!text) return m.reply('Tidak ada teks untuk di cari')
    res = await fetch(`https://fdciabdul.tech/api/pinterest?keyword=` + encodeURIComponent(text)).then((res) => res.json())
	result = JSON.parse(JSON.stringify(res));
    let dpa = pickRandom(result) || {}
    if (!dpa[3]) return m.reply(`Foto ${text} tidak dapat ditemukan!`)
    conn.sendFile(m.chat,dpa, "", `Nih ${text}`, m)
} 
handler.help = ['pinterest'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^pinterest$/
module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
