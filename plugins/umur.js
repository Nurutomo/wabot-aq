let handler = async(m, { conn, text, usedPrefix, command }) => {
  let errF = `Format salah!\nExample : ${usedPrefix + command} 2008-11-08`
  if(!text || text.length != 10 || !text.includes("-")) return m.reply(errF)
  let [ th, bl, tg ] = text.split("-");
  let now = new Date()
  let tanggal = now.getDate()
  let bulan = [1,2,3,4,5,6,7,8,9,10,11,12][now.getMonth()]
  let tahun = now.getFullYear()
  bl = Number(bl);
  tg = Number(tg);
  bulan = Number(bulan);
  tanggal = Number(tanggal);

  let umur = bulan >= bl && tanggal >= tg ? tahun - th : bl < bulan ? tahun - th : tahun - th - 1;
  let ultah = bulan >= bl && tanggal >= tg ? `${tahun + 1}-${bl < 10 ? "0" + bl : bl}-${tg < 10 ? "0" + tg : tg}` : bl < bulan ? `${tahun + 1}-${bl < 10 ? "0" + bl : bl}-${tg < 10 ? "0" + tg : tg}` : `${tahun}-${bl < 10 ? "0" + bl : bl}-${tg < 10 ? "0" + tg : tg}`

  m.reply(`*Umur :* ${umur}\n*Ultah :* ${ultah}`)
}

handler.help = ["ultah", "umur", "hitungumur"].map(v => v + " tahun-bulan-tanggal")
handler.tags = ["tools"]

handler.command = /^(ultah|umur|hitungumur)/i

module.exports = handler
