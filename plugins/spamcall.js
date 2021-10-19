let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`
  let nomor = text.replace(/[^0-9]/gi, '').slice(2)
  if (!nomor.startsWith('8')) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`
  m.reply('_*Tunggu permintaan anda sedang diproses.....*_')
  let anu = await fetch(`https://id.jagreward.com/member/verify-mobile/${nomor}`).then(a => a.json())
  let spcall = `*Nomor bot* : _${anu.phone_prefix}_\n\n_Bot berhasil menlpon anda!_`
  conn.reply(m.chat, `${spcall}`.trim(), m)
  m.reply(anu)
}
// by Aine
handler.help = ['spamcall <nomor>']
handler.tags = ['tools']
handler.command = /^(spamcall)$/i
handler.limit = true
module.exports = handler
