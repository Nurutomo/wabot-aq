let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix }) => {

  if (!text) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`

  let nomor = text.replace(/[^0-9]/gi, '').slice(2)

  if (!nomor.startsWith('8')) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`

  m.reply('_*Tunggu permintaan anda sedang diproses.....*_')

  let { result } = await fetch(`https://rikka-api.herokuapp.com/spamcall?target=${nomor}&apikey=beta`).then(a => a.json())

  m.reply(result)

  }

handler.help = ['spamcall <nomor>']

handler.tags = ['tools']



handler.command = /^(spamcall)$/i

module.exports = handler
