const { newMessagesDB } = require("@adiwajshing/baileys")

let handler = async (m, { conn, text }) => {
  if (!text) throw false
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag salah satu lah'
  txt = text.replace('@' + who.split`@`[0], '').trimStart()
  conn.emit('chat-update', {
    jid: who,
    hasNewMessage: true,
    messages: newMessagesDB([conn.cMod(m.chat, m, txt, who)])
  })
}
handler.command = /^sudo$/
handler.rowner = true

module.exports = handler
