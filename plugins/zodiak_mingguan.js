let axios = require('axios')
let cheerio = require('cheerio')
let handler = async (m, { conn, text, command, args }) => {
  if(!text) throw `Ulangi dengan menambahkan zodiak\n*Contoh* : ${usedPrefix + command} libra

▢ *List zodiak*

- Capricorn
- Aquarius
- Pisces
- Aries
- Taurus
- Gemini
- Cancer
- Leo
- Virgo
- Libra
- Scorpio
- Sagittarius
- Capricorn`
  gagal = 'Silahkan ulangi dengan menambahkan nama zodiak\n*Contoh* : /zodiak libra'
try {
	const link = await axios.get(`https://www.fimela.com/zodiak/${text}/minggu-ini`)
	const  $ = cheerio.load(link.data)
	let thumb = $('body > div > div > div').find('div > div > a > img').attr('src')
	let hoki = $('body > div > div > div > div').find('div > div > div:nth-child(1) > div > span').text().trim()
	let umum = $('body > div > div > div > div').find(' div > div > div:nth-child(1) > div > p').text().trim()
	let love = $('body > div > div > div > div').find(' div > div > div:nth-child(2) > div > p').text().trim()
	let keuangan = $('body > div > div > div > div').find(' div > div > div:nth-child(3) > div > p').text().trim()
	let rezeki = keuangan.replace('Couple', '\n\n- Couple').replace('Single', '- Single')
	capt = `${umum} Nomor keberuntungan kamu adalah *${hoki}*
	
▢ *Asmara* : 
${love}

▢ *Keuangan* : 
${rezeki}`

conn.sendFile(m.chat, thumb, 'zodiak.jpg', capt, m)
} catch (e) {
  m.reply('Hasil tidak ditemukan')
}
}

handler.help = ['Zodiakmingguan <zodiak>']
handler.tags = ['internet']
handler.command = /^zodiakmingguan?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true
handler.admin = false
handler.botAdmin = false
module.exports = handler

/*
@mrf.zvx
*/