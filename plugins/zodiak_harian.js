let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let handler = async (m, { conn, text, command }) => {
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
	try {
		let res = await fetch(`https://www.fimela.com/zodiak/${text}`)
		if (!res.ok) throw await res.text()
		let html = await res.text()
		let { document } = new JSDOM(html).window
		let thumb = document.querySelector('body > div > div > div div > div > a > img').src
		// let judul = document.querySelector('body > div > div.container-main > div.container-article > div div.zodiak--content-header__right > div.zodiak--content-header__text > h5').textContent.trim()
		// let tanggal = document.querySelector('body > div > div > div > div > div > div > span').textContent.trim()

		let main = document.querySelector('body > div > div > div > div > div > div')
		let nomer_ = main.find('div:nth-child(1) > div.zodiak--content__content > span').textContent.trim()
		let umum = main.find('div:nth-child(1) > div.zodiak--content__content > p').textContent.trim() || undefined
		let love = main.find('div:nth-child(2) > div.zodiak--content__content > p').textContent.trim() || undefined
		let keuangan = $('body > div > div > div > div > div > div').find('div:nth-child(3) > div.zodiak--content__content > p').textContent.trim() || undefined
		let rezeki = keuangan.replace('Couple', '\n\n- Couple').replace('Single', '- Single')
		let caption = `${umum} Nomor keberuntungan kamu adalah *${nomer_}*
		
▢ *Asmara* : 
${love}

▢ *Keuangan* : 
${rezeki}`

		conn.sendFile(m.chat, thumb, 'zodiak.jpeg', caption, m)
	} catch (e) {
		m.reply('Hasil tidak di temukan')
	}
}

handler.help = ['Zodiakharian <zodiak>']
handler.tags = ['internet']
handler.command = /^zodiakharian?$/i
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