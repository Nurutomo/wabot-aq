// Terimakasih kpd RC047 :v
// Fitur By Xteams

const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { usedPrefix, conn, args, text }) => {
  let [tipe, emoji] = text.includes('|') ? text.split('|') : args
  if (tipe && !emoji) {
    emoji = tipe
    tipe = 'whatsapp'
  }
  if (!emoji) throw `Silahkan masukan emojinya\n\nMisal ${usedPrefix}semoji whatsapp 😎\n\nList Tipe:
- whatsapp
- facebook
- apple
- google
- microsoft`
  let stiker = await sticker(null, global.API('xteam', '/sticker/emojitopng' + encodeURI(tipe.trim().toLowerCase()), { emo: emoji.trim() }, 'APIKEY'), global.packname, global.author)
//   m.reply(`
// Tipe: ${tipe.trim().toLowerCase()}
// Emoji: ${emoji.trim()}
// `.trim())
  m.reply(stiker)
}
handler.help = ['semoji [tipe] <emoji>']
handler.tags = ['sticker']
handler.command = /^s?emo(ji)?$/i
module.exports = handler
