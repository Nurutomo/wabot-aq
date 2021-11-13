let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `
╭─「 BUY PREMIUM 」
│ 
│ > Keuntungan :
│• Limit Tidak Terbatas!
│• Fitur Premium Dapat Digunakan!
│• Dapat Menambahkan Bot Ke Grup!
│
│ > Bonus :
│• Diberi 5 Limit Setiap Hari
│
│ > Harga :
│• 10K / Bulan (4 Minguu)
│• 30K / Tahun (12 Bulan)
│• 50K / VIP (Permanen)
│
│ > Pembayaran :
│• AXIS : -
│• TELKOMSEL : 081515589573
╰────
`.trim()

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', '*BOT TERVERIFIKASI*', 'status@broadcast')
} 
handler.help = ['premium']
handler.tags = ['info']
handler.command = /^(premium)$/i

handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.fail = null
handler.exp = 100

module.exports = handler