let { Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
	conn.updatePresence(m.chat, Presence.composing) 
	let res = await conn.groupMetadata(m.chat)
	let pp = './src/avatar_contact.png'
  try {
	pp = await conn.getProfilePicture(m.chat)
		} catch (e) {
	} finally {
	
		let welcome = global.DATABASE.data.chats[m.chat].welcome
		let antiLink = global.DATABASE.data.chats[m.chat].antiLink
		let hapus = global.DATABASE.data.chats[m.chat].delete
    let isBanned = global.DATABASE.data.chats[m.chat].isBanned
    
	
	let caption = `
       *「 Group Info 」*
*Name Group*: ${res.subject}
*ID*: ${res.id}
*Made on*: ${formatDate(res.creation * 1000)}
*Description:*
${res.desc}

  -> Banned : ${data(isBanned)}
  -> Anti-Link : ${data(antiLink)}
  -> Welcome Msg : ${data(welcome)}
  -> Delete Msg : ${data(hapus)}
`.trim()
	
	conn.sendFile(m.chat, pp, 'profile.jpg', caption, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(caption)
    }
  })
	}
}
handler.help = ['groupinfo']
handler.tags = ['group']
handler.command = /^(groupinfo)$/i
handler.register = true
handler.group = true
handler.limit = false
module.exports = handler

function ucword(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

function data(str){
	if (ucword(str) == "False"){
		return "Inactive"
	}else {
		return "Active"
	}
}

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}
