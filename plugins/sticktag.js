const { MessageType } = require('@adiwajshing/baileys')
const { sticker: TES } = require('../lib/sticker')
const util = require('util')
const fs = require('fs')
let handler = async (m, { conn, participants, args }) => {
let stiker = false
  try {
	let q = { message: { [m.quoted.mtype]: m.quoted }}
	if (!m.quoted) return m.reply('Tag Sticker Only!')
  //if (m.quoted != /sticker/.test(m.quoted.mtype)) return m.reply('Sticker Aja Tod!')
	if (/sticker/.test(m.quoted.mtype)) {
    let stick = await conn.downloadM(q)
    if (!stick) throw "Sticker Not Found!"
	let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
	stiker = await TES(stick, false, global.packname, global.author)
	conn.sendMessage(m.chat, stiker, MessageType.sticker, {
              contextInfo: { 
                     mentionedJid: users
               }
          })
       } else {
	    m.reply('_Sticker only!_')
      }
   } catch (e) {
   	m.reply('```*Error* Reply Sticker```')
   console.log ('Error\n\n', e)
   }
}
handler.help = ['stag <tag sticker>','stickertag <tag sticker>']
handler.command = /^(s(tag|tickertag|tikertag))$/i
handler.tags = ['sticker']
handler.limit = true
handler.group = true
module.exports = handler
