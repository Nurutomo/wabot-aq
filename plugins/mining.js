// MINING IS LIFE!!!

let handler = async (m, { conn }) => {

let hasil = Math.floor(Math.random() * 1000)
global.DATABASE._data.users[m.sender].exp += hasil * 1 // Number(hasil)
   await m.reply(`Selamat! Anda mendapatkan ${hasil} exp!`)
}

handler.help = ['mining', 'nguli']
handler.tags = ['xp']
handler.command = /^(mining|nguli)$/i
handler.limit = true

module.exports = handler
