/*
Made with <3 by Yusuf Aidil
         https://github.com/AidilS60

jangan hapus apalagi ubah credit beb, pake aja :*
*/
const fetch = require('node-fetch')
let timeout = 60000
let poin = 650
let handler = async (m, { conn, usedPrefix }) => {
  conn.logoquiz = conn.logoquiz ? conn.logoquiz : {}
  let id = m.chat
  if (id in conn.logoquiz) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.logoquiz[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/Aidils60/database/main/logoquizid.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `
  ${json.deskripsi}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hints untuk bantuan
Bonus: ${poin} XP
    `.trim()
  conn.logoquiz[id] = [
    await conn.sendButtonImg(m.chat, await (await fetch(json.img)).buffer(), caption, '© idilBot', 'Bantuan', '.hints', m)
    ,
    json, poin,
    setTimeout(async () => {
      if (conn.logoquiz[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, '© idilBot', 'Logo Quiz', '.logoquiz', conn.logoquiz[id][0])
      delete conn.logoquiz[id]
    }, timeout)
  ]
}
handler.help = ['logoquiz']
handler.tags = ['game']
handler.command = /^(logoquiz|tebaklogo)$/i

module.exports = handler