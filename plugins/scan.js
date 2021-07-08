let handler  = async (m, { conn, text, args, usedPrefix, command }) => {

if (!args[0] || args.length > 0) throw 'Masukkan Nomor untuk dipindai'
let { exists, jid,  isBussiness } = await conn.isOnWhatsApp(args[0])
if (exists) await m.reply(`${text}\n*✅️ Orang Bernomor Menggunakan WhatsApp ✅️`)
else throw '`${text}\n*❌️ Orang Bernomor Tidak Menggunakan WhatsApp ❌️'
}
handler.help = ['scan'].map(v => v + ' <tesks>')
handler.tags = ['tools']

handler.command = /^scan$/i

module.exports = handler
