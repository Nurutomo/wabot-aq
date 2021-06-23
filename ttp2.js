const uploadImage = require('../lib/uploadImage') 
const fetch = require('node-fetch')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
 try {
     let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
     let url = await fetch(global.API('https://salism3api.pythonanywhere.com','/text2img/',{text: teks}))
     res = await url.json()
     stick = res.image
  let stiker = await sticker(null, stick, global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
 } catch (e) {
   m.reply('Conversion Failed')
   throw false
  }
}
handler.help = ['ttp2']
handler.tags = ['sticker']
handler.command = /^(ttp2)$/i
handler.limit = true
//MadeByAnshul
module.exports = handler