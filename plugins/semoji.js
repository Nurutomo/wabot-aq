// Terimakasih kpd RC047 :v
// Fitur By Xteams

const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
let [tipe, emoji] = text.split `|`
 try {
  if (!tipe) throw 'Silahkan masukan tipe emoji\n\nMisal !emoji whatsapp'
  if (!emoji) throw 'Emoji?'
  let stiker = await sticker(null, global.API('xteam', '/sticker/emojitopng' + tipe, { emo: emoji }, 'APIKEY'), global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
 } catch (e) {
   m.reply('Gagal!')
  }
}
handler.help = ['semoji <tipe>|<emoji>']
handler.tags = ['sticker']
handler.command = /^semoji$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
