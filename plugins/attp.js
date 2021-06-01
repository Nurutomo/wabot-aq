const fetch = require('node-fetch')
const FormData = require('form-data')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Uhm...Teksnya?'
  conn.sendFile(m.chat, global.API('xteam', '/attp', { file: '', text: text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text }), 'attp.webp', '', m, false, { asSticker: true })
}
handler.help = ['attp <teks>']
handler.tags = ['sticker']
handler.command = /^attp$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

