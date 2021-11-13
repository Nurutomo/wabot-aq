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
┌─── ⳹°❀❬ Owner ❭❀°
│✎ ${usedPrefix}addprem [@user]
│✎ ${usedPrefix}whitelist nomor,nomor
│✎ ${usedPrefix}ban
│✎ ${usedPrefix}blocklist
│✎ ${usedPrefix}broadcast <teks>
│✎ ${usedPrefix}bc <teks>
│✎ ${usedPrefix}broadcastgroup <teks>
│✎ ${usedPrefix}bcgc <teks>
│✎ ${usedPrefix}clearchat
│✎ ${usedPrefix}clearchat chat
│✎ ${usedPrefix}clearchat group
│✎ ${usedPrefix}clearchat all
│✎ ${usedPrefix}deletechat
│✎ ${usedPrefix}deletechat chat
│✎ ${usedPrefix}deletechat group
│✎ ${usedPrefix}deletechat all
│✎ ${usedPrefix}mutechat
│✎ ${usedPrefix}mutechat chat
│✎ ${usedPrefix}mutechat group
│✎ ${usedPrefix}mutechat all
│✎ ${usedPrefix}delprem [@user]
│✎ ${usedPrefix}on <opsi>
│✎ ${usedPrefix}off <opsi>
│✎ ${usedPrefix}expired <hari>
│✎ ${usedPrefix}oadd @user
│✎ ${usedPrefix}o+ @user
│✎ ${usedPrefix}okick @user
│✎ ${usedPrefix}o- @user
│✎ ${usedPrefix}ohidetag [teks]
│✎ ${usedPrefix}opromote @user
│✎ ${usedPrefix}oadmin @user
│✎ ${usedPrefix}o^ @user
│✎ ${usedPrefix}premlist
│✎ ${usedPrefix}setbotbio <teks>
│✎ ${usedPrefix}setbotname <teks>
│✎ ${usedPrefix}setbye <teks>
│✎ ${usedPrefix}setmenu <teks>
│✎ ${usedPrefix}setmenubefore <teks>
│✎ ${usedPrefix}setmenuheader <teks>
│✎ ${usedPrefix}setmenubody <teks>
│✎ ${usedPrefix}setmenufooter <teks>
│✎ ${usedPrefix}setmenuafter <teks>
│✎ ${usedPrefix}setwelcome <teks>
│✎ ${usedPrefix}simulate <event> [@mention]
│✎ ${usedPrefix}unban
│✎ ${usedPrefix}upsw [text] (Reply Media)
│✎ ${usedPrefix}upsw <teks>
└────────────┈ ⳹ ❋ཻུ۪۪⸙
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['ownermenu']
handler.tags = ['jj']
handler.command = /^(ownermenu)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.refister = true
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

