// SC By Arya
// Recode By RC047 :V

const { MessageType } = require('@adiwajshing/baileys')

let handler = async(m, { conn, text, participants, isPrems }) => {
let who
  if (m.isGroup) who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  else who = m.chat
  if (!who) throw 'Tag orang yang akan dijadikan premium!'
 // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
  let user = `${who.split("@s.whatsapp.net")[0]}`
  global.prems.push(user)
    m.reply(`*Berhasil Add Premium✅*\n\nNomor : wa.me/${who.split("@s.whatsapp.net")[0]}\nExpired : 30 Hari\n\nTerimakasih telah beli Premium!`)
 // } else m.reply('Ada nomor host disini...')
}
handler.help = ['addprems <nomor>']
handler.tags = ['owner']
handler.command = /^addprems$/i
handler.rowner = true

module.exports = handler
