let fetch = require('node-fetch')

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...url nya mana?'

let lol = ''//MASUKKAN APIKEY LU DISINI!

  let res = await fetch(https://api.lolhuman.xyz/api/facebook?apikey=${lol}&url=${args[0]}`)
    let json = await res.json()
  if (!json.result) throw ''
  conn.sendFile(m.chat, json.result, 'fb.mp4', `Done`, m)
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i

module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
//EROR NANTI DIFIX
