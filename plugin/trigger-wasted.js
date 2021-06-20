//kok cewe gw jadi cuek yahh? daritadi pagi gw chat ga dibales cuman di read doang
//Yo ndak tau kok tanya saya

const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, command }) => {
  let anu = command.replace('ed', '')
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let hasil = global.API('https://some-random-api.ml', '/canvas/${anu}ed', {
    avatar: await conn.getProfilePicture(who).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  })
  let stiker = await sticker(null, hasil, global.packname, global.author)
 if (stiker) return conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
  throw stiker.toString()
}


handler.help = ['trigger', 'wasted']
handler.tags = ['maker']

handler.command = /^(wasted|trigger(ed)?)$/i

module.exports = handler
