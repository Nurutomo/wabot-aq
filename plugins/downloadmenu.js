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
┌─── ⳹°❀❬ Downloader ❭❀°
│✎ ${usedPrefix}fb <url>
│✎ ${usedPrefix}ig <url> (Limit)
│✎ ${usedPrefix}ighighlight <username>
│✎ ${usedPrefix}igstory <username> (Limit)
│✎ ${usedPrefix}joox <judul> (Limit)
│✎ ${usedPrefix}pinterestvideo <url> (Limit)
│✎ ${usedPrefix}play <pencarian> (Limit)
│✎ ${usedPrefix}play2 <pencarian> (Limit)
│✎ ${usedPrefix}tiktok <url> (Limit)
│✎ ${usedPrefix}twitter <url> (Limit)
│✎ ${usedPrefix}ytmp3 <url> [server: id4, en60, en61, en68] (Limit)
│✎ ${usedPrefix}yta <url> [server: id4, en60, en61, en68] (Limit)
│✎ ${usedPrefix}ytmp4 <url> [server: id4, en60, en61, en68] (Limit)
│✎ ${usedPrefix}ytv <url> [server: id4, en60, en61, en68] (Limit)
│✎ ${usedPrefix}yt <url> [server: id4, en60, en61, en68] (Limit)
└────────────┈ ⳹ ❋ཻུ۪۪⸙
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['downloadmenu']
handler.tags = ['jj']
handler.command = /^(downloadmenu)$/i
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