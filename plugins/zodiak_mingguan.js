let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let handler = async (m, { conn, text, command, args }) => {
	if (!text) throw `Ulangi dengan menambahkan zodiak\n*Contoh* : ${usedPrefix + command} libra

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
		let res = await fetch(`https://www.fimela.com/zodiak/${text}/minggu-ini`)
		if (!res.ok) throw await res.text()
		let html = await res.text()
		let { document } = new JSDOM(html).window
		let thumb = document.querySelector('body > div > div > div').querySelector('div > div > a > img').src
		let main = document.querySelector('body > div > div > div > div')
		let hoki = main.querySelector('div > div > div:nth-child(1) > div > span').textContent.trim()
		let umum = main.querySelector('div > div > div:nth-child(1) > div > p').textContent.trim()
		let love = main.querySelector('div > div > div:nth-child(2) > div > p').textContent.trim()
		let keuangan = main.querySelector('div > div > div:nth-child(3) > div > p').textContent.trim()
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