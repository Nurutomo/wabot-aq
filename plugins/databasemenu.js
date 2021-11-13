let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, usedPrefix }) => {

  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let str = `
┌─── ⳹°❀❬ Database Menu ❭❀°
│✎ ${usedPrefix}addvn <teks>
│✎ ${usedPrefix}addmsg <teks>
│✎ ${usedPrefix}addvideo <teks>
│✎ ${usedPrefix}addaudio <teks>
│✎ ${usedPrefix}addimg <teks>
│✎ ${usedPrefix}addsticker <teks>
│✎ ${usedPrefix}delcmd <teks>
│✎ ${usedPrefix}delvn <teks>
│✎ ${usedPrefix}delmsg <teks>
│✎ ${usedPrefix}delvideo <teks>
│✎ ${usedPrefix}delaudio <teks>
│✎ ${usedPrefix}delimg <teks>
│✎ ${usedPrefix}delsticker <teks>
│✎ ${usedPrefix}getvn <teks>
│✎ ${usedPrefix}getmsg <teks>
│✎ ${usedPrefix}getvideo <teks>
│✎ ${usedPrefix}getaudio <teks>
│✎ ${usedPrefix}getimg <teks>
│✎ ${usedPrefix}getsticker <teks>
│✎ ${usedPrefix}listcmd <text>
│✎ ${usedPrefix}listvn
│✎ ${usedPrefix}listmsg
│✎ ${usedPrefix}listvideo
│✎ ${usedPrefix}listaudio
│✎ ${usedPrefix}listimg
│✎ ${usedPrefix}liststicker
│✎ ${usedPrefix}unlockcmd
│✎ ${usedPrefix}lockcmd
│✎ ${usedPrefix}setcmd <teks>
└────────────┈ ⳹ ❋ཻུ۪۪⸙
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['dbmenu']
handler.tags = ['jj']
handler.command = /^(dbmenu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler