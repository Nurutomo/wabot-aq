const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')

let handler = async(m, { conn, text, participants, isPrems }) => {
let who
  if (m.isGroup) who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  else who = m.chat
  if (!who) throw 'Tag orang yang akan dijadikan premium!'
  if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
  let user = `${who.split("@s.whatsapp.net")[0]}`
  let up = global.prems.push(user)
    m.reply(`*「 ADD PREMIUM 」*\n\nNomor : wa.me/${who.split("@s.whatsapp.net")[0]}\n*Expired : Until the bot dies*\n\nTerimakasih telah beli Premium!`)
   } else m.reply('Ada nomor host disini..')
  }
handler.help = ['addprem <@user>']
handler.tags = ['owner']
handler.command = /^addprem$/i
handler.rowner = true

module.exports = handler
