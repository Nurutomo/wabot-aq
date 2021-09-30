let axios = require('axios')
let cheerio = require('cheerio')
let handler = async (m, { text, usedPrefix, command }) => {
  
const res = await axios.get(`http://149.56.24.226/?s=` + text, {
headers: { 
           "cache-control": "no-transform",
           "content-type": "text/html; charset=UTF-8",
           "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
         }
})
const hasil = []
const $ = cheerio.load(res.data)
$('div.row > div.col-xs-3.col-sm-2.search-poster').each(function (a, b) {
let url = $(b).find('a').attr('href')
let img = $(b).find('img').attr('src').replace('//','')
let title = $(b).find('a').attr('title')
const result = {
	film_title: title,
	film_link: url,
	film_thumb: img,
}
hasil.push(result)
})

let caption = hasil.map(v => `▢ *Judul* : ${v.film_title}\n▢ *Link* : ${v.film_link}`).join('\n────────────────\n')
  m.reply(`*LAYAR KACA*\n\n${caption}`)
}

handler.help = ['Layarkaca'].map(v => v + ' <query>')
handler.tags = ['internet']
handler.command = /^(layarkaca)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = false
handler.admin = false
handler.botAdmin = false
module.exports = handler
