const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Tidak ada teks?'
  let stiker = await sticker(null, global.API('xteam', '/ttp', { file: '', text }), global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
}
handler.help = ['ttp <teks>']
handler.tags = ['sticker']
handler.command = /^ttp$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

