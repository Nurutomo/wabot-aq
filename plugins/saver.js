let PhoneNumber = require('awesome-phonenumber')

let handler = async(m, { conn, text }) => {

   let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
   if (!text) return conn.reply(m.chat, 'Mau Disave Namanya Apa?', m)
   let nomor = `${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`
   let nama = `${text}`

  conn.sendContact(m.chat, nomor, nama, m)
}
handler.help = ['save <nama>']
handler.tags = ['tools']
handler.command = /^(save)$/i

handler.fail = null

module.exports = handler
