const { igdl } = require('../lib/scrape_igdl')

let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) throw `*Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_medium=copy_link`

  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CQU21b0JKwq/`

  igdl(args[0]).then(async res => {

    let igdl = JSON.stringify(res)

    let json = JSON.parse(igdl)

    for (let { downloadUrl, type } of json) {

      await delay(1500)

      conn.sendFile(m.chat, downloadUrl, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), '*© stikerin*', m, { thumbnail: Buffer.alloc(0) })

    }

  })

}

handler.help = ['ig'].map(v => v + ' <url>')

handler.tags = ['downloader']

handler.command = /^(ig|instagram)$/i

handler.limit = true

handler.premium = true // hapus aja gpp karena makan kuota termux ku :)

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time)) 
