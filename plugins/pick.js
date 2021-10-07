let handler = async (m, { conn, text,participants}) => {
let users = participants.map(u => u.jid)
if (!text) throw 'Example: #pick 15 | gay'
let users = participants.map(u => u.jid)
let split = text.split`|`
let entah = split[0]
let jum = split[1]
let nus = users
let ids_mem = []
teks = `*Kamu Terpick sebagai ${entah}*\n\n`
for (let i = 0; i < jum; i++) {
let sipa = nus[Math.floor(Math.random() * nus.length)]
teks += `@${sipa.jid.split("@")[0]}\n`
ids_mem.push(sipa.jid)
}
m.reply(teks+ids_mem)
}
handler.help = ['pick <jumlah>|<teks>']
handler.command = /^pick/i

module.exports = handler
