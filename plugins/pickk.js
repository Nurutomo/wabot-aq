let handler = async (m, { conn, text,participants}) => {
let gsg = participants.map(u => u.jid)
if (!text) throw 'Example: #pick 15 | gay'
let users = participants.map(u => u.jid)
let split = text.split`|`
teks = `*Kamu Terpick sebagai ${split[1]}*\n\n`
for (let i = 0; i <  split[0]; i++) {
let sipa = gsg[Math.floor(Math.random() * gsg.length)]
teks += `@${sipa.jid.split("@")[0]}\n`
}
m.reply(teks)
}
handler.help = ['pick <jumlah>|<teks>']
handler.command = /^pick/i

module.exports = handler
