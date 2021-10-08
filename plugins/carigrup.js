let fetch = require('node-fetch')
let axios = require ('axios')
let cheerio = require ('cheerio')
let handler = async (m, { conn, text }) => {
    if (!text) throw 'Cari apa?'
axios.get(`http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=${text}&searchby=name`, {
method: 'GET'
}).then(res => {
let hasal = []
let hah = cheerio.load(res.data)
hah('div.wa-chat-body').each(function(c, d) {
let bokepli = hah(d).find('a').attr('href')
let wers = hah(d).find('div.wa-chat-title-text').text().trim()
let result = {
	name_group: wers,
	link: bokepli
}
hasal.push(result)
})
reo = '*Search Group*\n\n'
for (let i of hasal ) {
reo += `Name Group: ${i.name_group}\n`
reo += `Link Group: ${i.link}\n\n`
}
m.reply(reo)
})
}
handler.help = ['carigrup <pencarian>']
handler.tags = ['tools']
handler.limit = true
handler.command = /^carigrup/i

module.exports = handler
