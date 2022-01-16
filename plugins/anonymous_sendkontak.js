/*
Made by Aine
Anonymous Chat
wa.me/62896543604477?text=.menu

Bantu ramein iya 🙏
*/

let { MessageType, Presence } = require('@adiwajshing/baileys')

async function handler(m, { command, conn, text }) {
	await conn.updatePresence(m.chat, Presence.composing)
	this.anonymous = this.anonymous ? this.anonymous : {}
	let room = Object.values(this.anonymous).find(room => room.check(m.sender))
	m.reply('\`\`\`\Berhasil mengirim contacts mu ke partner ✓\`\`\`\')
	let other = room.other(m.sender)
  var name
  if (text) name = text
  else name = conn.getName(m.sender)
	var number = m.sender.split('@')[0]
	if (other) this.sendContact(other, number, name, m)
}
handler.help = ['sendkontak']
handler.tags = 'anonymous'
handler.command = /^(sendkontak)$/i
handler.private = true
handler.fail = null
module.exports = handler
