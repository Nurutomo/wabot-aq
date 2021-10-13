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
try {
	const link = await axios.get(`https://www.fimela.com/zodiak/${text}`)
			const $ = cheerio.load(link.data)
			let thumb = $('body > div > div > div').find('div > div > a > img').attr('src')
			let judul = $('body > div > div.container-main > div.container-article > div').find('div.zodiak--content-header__right > div.zodiak--content-header__text > h5').text().trim()
			let tanggal = $('body > div > div > div > div > div > div > span').text().trim()
			let nomer_ = $('body > div > div > div > div > div > div').find('div:nth-child(1) > div.zodiak--content__content > span').text().trim()
				let umum = $('body > div > div > div > div > div > div').find('div:nth-child(1) > div.zodiak--content__content > p').text().trim() || undefined
				let love = $('body > div > div > div > div > div > div').find('div:nth-child(2) > div.zodiak--content__content > p').text().trim() || undefined
				let keuangan = $('body > div > div > div > div > div > div').find('div:nth-child(3) > div.zodiak--content__content > p').text().trim() || undefined
        let rezeki = keuangan.replace('Couple', '\n\n- Couple').replace('Single', '- Single')
		caption = `${umum} Nomor keberuntungan kamu adalah *${nomer_}*
		
▢ *Asmara* : 
${love}

▢ *Keuangan* : 
${rezeki}`

conn.sendFile(m.chat, thumb, 'zodiak.jpeg' , caption, m)
} catch (e){
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