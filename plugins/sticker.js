const { MessageType, Mimetype } = require('@adiwajshing/baileys')
const WSF = require('wa-sticker-formatter')
//const { sticker } = require('../lib/sticker')
//const uploadFile = require('../lib/uploadFile')
//const uploadImage = require('../lib/uploadImage')
//let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/webp/.test(mime)) {
      let img = await q.download()
      if (!img) throw `balas stiker dengan perintah ${usedPrefix + command}`
      sticker = new WSF.Sticker(img , {
        pack: global.packname,
        author: global.author,
        crop: false,
       })
    } else if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) throw `balas gambar dengan perintah ${usedPrefix + command}`
      sticker = new WSF.Sticker(img , {
        pack: global.packname,
        author: global.author,
        crop: false,
       })
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
      let img = await q.download()
      if (!img) throw `balas video dengan perintah ${usedPrefix + command}`
      sticker = new WSF.Sticker(img , {
        pack: global.packname,
        author: global.author,
        crop: true,
       })
    } else if (args[0]) {
      if (!isUrl(args[0])) throw 'URL tidak valid! @Daeho'
      sticker = new WSF.Sticker(args[0] , {
        pack: global.packname,
        author: global.author,
        crop: false,
       })
    }
  } finally {
    await sticker.build()
    const sticBuffer = await sticker.get()
        if (sticBuffer) await conn.sendMessage(m.chat, sticBuffer, MessageType.sticker, {
        quoted: m,
        mimetype: Mimetype.webp
      })
    else throw 'Conversion failed'
  }
}
handler.help = ['stiker ', 'stiker <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
