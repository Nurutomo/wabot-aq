let fetch = require('node-fetch')
const FormData = require('form-data')
const cheerio = require('cheerio')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...url nya mana?'
//   Instagram Downloader By DwiRizqiH
  try {
    const downloadIg = new FormData();
    await downloadIg.append('url', args[0])
    await downloadIg.append('submit', '')
    await fetch('https://downloadgram.org/#downloadhere', {
        method: 'post',
        body: downloadIg,
        headers: downloadIg.getHeaders()
    })
    .then(res => res.text()) 
    .then(res => {
        const $ = cheerio.load(res)
        $(`#downloadBox > a`).each((a, b) => {
            const urlDownload = $(b).attr('href')
            let nameFile = ''
            let loop = 1
            for (let i = 0; i < loop; i++) {
              const validate = urlDownload.trim().split('/')[i]
              if (!urlDownload.includes('?')) {
                // Prevent Stuck
                nameFile = ''
              } else if (validate.includes('?')) {
                nameFile = validate.split('?')[0]
              } else {
                loop++
              }
            }
            if(urlDownload == undefined || urlDownload == null) return m.reply('Not Found!')
            conn.sendFile(m.chat, urlDownload, nameFile, '', m)
        })
    })
  } catch (err) {
    console.log(err)
    m.reply('Error!')
  }
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i

module.exports = handler
