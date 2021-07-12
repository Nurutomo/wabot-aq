// Terimakasih kpd RC047 :v
// Fitur By Xteams
// Modified by Nurutomo (Update Xteam :v)
// Update No API biar unlimited Hit :v
//:v
const { sticker } = require('../lib/sticker')
const { emoji } = require('../lib/emojipedias.js')
const fetch = require('node-fetch')
const defaultType = 'whatsapp'
let handler = async (m, { usedPrefix, conn, args, text }) => {
  let [tipe, emo] = text.includes('|') ? text.split('|') : args
  if (tipe && !emo) { 
    emo = tipe
    tipe = defaultType
  }
  if (!emo) throw `
Silahkan masukan emojinya

Misal ${usedPrefix}emo whatsapp 😎

List Tipe:
${[
"apple",
"google",
"samsung",
"microsoft",
"whatsapp",
"twitter",
"facebook",
"jooxpixel",
"openemoji",
"emojidex",
"messanger",
"lg",
"htc",
"mozila",
"softbank",
"docomo",
"kddi",
].map(v => `- ${v}`).join('\n')}
`.trim()
  emo = emo.trim()
  tipe = tipe.trim().toLowerCase()

  let res = await emoji(`${emo}`)
  if (!(tipe in res)) tipe = defaultType
  let stiker = await sticker(null, res.result[tipe].img,global.packname, global.author, [emo], { name: res.result[tipe].img })
  //   m.reply(`
  // Tipe: ${tipe}
  // Emoji: ${emoji}
  // `.trim()) 
  m.reply(stiker)
}
handler.help = ['semoji [tipe] <emoji>']
handler.tags = ['sticker']
handler.command = /^s?emo(ji)?$/i
module.exports = handler
