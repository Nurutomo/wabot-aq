let fetch = require('node-fetch')
const FormData = require('form-data')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...url nya mana?'
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
            const nameFile0 = urlDownload.trim().split('/')[5]
            const nameFile = nameFile0.split('?')[0]
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
