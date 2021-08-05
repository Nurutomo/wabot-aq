const cheerio = require('cheerio')
const fetch = require('node-fetch')

module.exports = function quotes(input) {
	return new Promise((resolve, reject) => {
		fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
			.then(res => res.text())
			.then(res => {
				const $ = cheerio.load(res)
				data = []
				$('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
					x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
					y = $(this).find('span[class="auteur-beschrijving"]').text().trim()
					z = $(element).find('q[class="fbquote"]').text().trim()
					data.push({ author: x, bio: y, quote: z })
				})
				data.splice(2, 1)
				if (data.length == 0) return resolve({ creator: '@neoxr - Wildan Izzudin & @ariffb.id - Ariffb', status: false })
				resolve({ creator: '@neoxr - Wildan Izzudin & @ariffb.id - Ariffb', status: true, data })
			}).catch(reject)
	})
}