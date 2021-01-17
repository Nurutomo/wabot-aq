let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
  let cm = copy(m)
  if (m.isGroup) cm.participant = m.mentionedJid[0]
  cm.key.fromMe = false
  cm.message[m.mtype] = copy(m.msg)
  txt = text.replace('@' + m.mentionedJid[0].split`@`[0], '').trimStart()
	if (m.mtype == MessageType.text) cm.message[m.mtype] = txt
	if (m.mtype == MessageType.extendedText) cm.message[m.mtype].text = txt
  else if (m.mtype == MessageType.image || m.mtype == MessageType.video) cm.message[m.mtype].caption = txt

  conn.emit('message-new', cm)
}
handler.command = /^sudo$/
handler.owner = true

module.exports = handler

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
