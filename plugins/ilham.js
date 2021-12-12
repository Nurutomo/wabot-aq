let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix }) => {
  conn.reply(m.chat, `*${pickRandom(ilham)}*\n_-Kata ilham_`, m)
}
handler.help = ['ilham']
handler.tags = ['quotes']
handler.command = /^(ilham)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const ilham = [
"Nggak ada yang peduli denganmu di sosmed kecuali kamu cakep",
"Sesimpel ini deh, sibuk itu palsu, semua tergantung prioritas",
"Dia hanya menghargaimu, bukan mencintaimu",
"Keadilan sosial hanya berlaku bagi warna negara yang good looking",
"Jangan jadi pelangi untuk orang yang buta warna",
"Dia yang tertidur nyenyak setelah mematahkan hatimu tidak pantas untuk kamu ingat",
"Dia cuman bercanda, harusnya kamu ketawa, bukan malah jatuh cinta",
"Mencintaimu adalah seni menyakiti diri",
"Jika tidak bisa mewarnai hidup seseorang, maka jangan pudarkan warna aslinya",
"Cukup tahu namaku, jangan rupaku",
"Sesuatu akan terasa berharga jika sudah kehilangan",
"Jangan pernah mengeluh ketika kopimu dingin, ia pernah hangat, namun kau diamkan",
"ngapain tidur kalo besok bangun lagi",
"dia ngetik pake jari, lu bales pake hati",
"Dia tak buta warna, kau yang bukan pelanginya",
"Dia nggk sibuk, lu yang bukan prioritas nya",
"Jangan pernah jadi pelangi, untuk seseorang yang buta warna"
]
