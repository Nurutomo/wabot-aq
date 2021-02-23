const { MessageType } = require('@adiwajshing/baileys')
const { sticker, sticker2 } = require('../lib/sticker')
let handler  = async (m, { conn, args }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    if (/image/.test(q.mimetype || '')) {
      let img = await q.download()
      if (!img) throw img
      stiker = await sticker2(img)
    } else if (args[0]) stiker = await sticker2(false, args[0])
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  }
}
handler.help = ['stiker (caption|reply media)', 'stiker <url>']
handler.tags = ['sticker']
handler.command = /^stic?ker$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

