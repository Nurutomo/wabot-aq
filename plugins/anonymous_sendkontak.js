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
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let room = Object.values(this.anonymous).find(room => room.check(who))
	if (!room) throw 'kamu tidak berada di anonymous chat'
	let other = room.other(who)
  var name
  if (text) name = text
  else name = conn.getName(m.sender)
	var number = who.split('@')[0]
	if (other) this.sendMessage(other, `Partner mengirimkan kontak kepadamu`, MessageType.text)
	if (other) this.sendContact(other, number, name, m)
}
handler.help = ['sendkontak']
handler.tags = 'anonymous'
handler.command = /^(sendkontak)$/i
handler.private = true
handler.fail = null
module.exports = handler
