let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  if (!text) return
  let cm = copy(m)
  let who
  if (m.isGroup) who = cm.participant = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag salah satu lah'
  cm.key.fromMe = false
  cm.message[m.mtype] = copy(m.msg)
  txt = text.replace('@' + who.split`@`[0], '').trimStart()
	if (m.mtype == MessageType.text) cm.message[m.mtype] = txt
	if (m.mtype == MessageType.extendedText) cm.message[m.mtype].text = txt
  else if (m.mtype == MessageType.image || m.mtype == MessageType.video) cm.message[m.mtype].caption = txt

  conn.emit('message-new', cm)
}
handler.command = /^sudo$/
handler.rowner = true

module.exports = handler

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
