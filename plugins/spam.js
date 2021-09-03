/* RC047
 * wa.me/62895337278647
 */

let handler = async (m, { conn, text }) => {

let [nomor, pesan, jumlah] = text.split('|')
if (!nomor) throw 'Silahkan masukan nomor yang akan dispam'
if (!pesan) throw 'Silahkan masukan pesan yang akan dikirim'
if (jumlah && isNaN(jumlah)) throw 'Jumlah harus berupa angka!'

  let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
  let fixedJumlah = jumlah ? jumlah * 1 : 10
  if (fixedJumlah > 100) throw 'Jumlah terlalu banyak!'
  await m.reply(`[!] Berhasil mengirimkan spam whatsapp ke ${nomor} sebanyak ${fixedJumlah} kali!`)
  for (let i = fixedJumlah; i > 1; i--) {
  if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m)
  }
}
handler.help = ['spamwa <nomor>|<pesan>|<jumlah>']
handler.tags = ['tools']
handler.command = /^spam(wa)?$/i

handler.limit = true

module.exports = handler
