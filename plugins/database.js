let fs = require('fs')
let handler  = async (m, { conn, text }) => {
m.reply('Tunggu Sebentar, Proses Getting File database.json')
let db = fs.readFileSync('./database.json')
conn.sendFile(m.chat, db, 'database.json', m)
}
handler.help = ['getdb','getdatabase'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(db|getdb)$/i
handler.owner = true
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const randomID = length => require('crypto').randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
