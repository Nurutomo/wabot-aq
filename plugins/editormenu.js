let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, usedPrefix }) => {

  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, banned, lastclaim, registered, regTime, age, level } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let str = `
┏━━°❀❬ *USER PROFILE* ❭❀°━━┓
┃
┃•  *Nama :* ${username}
┃•  *Umur :* ${registered ? '' + age : ''}
┃•  *Exp :* ${exp}
┃•  *Limit :* ${limit}
┃•  *Level :* ${level}
┃
┣━━°❀❬ *EDITOR MENU* ❭❀°━━┓
┃
┣➥ *${usedPrefix}8bit (Limit)*
┣➥ *${usedPrefix}alien (Limit)*
┣➥ *${usedPrefix}blur (Limit)*
┣➥ *${usedPrefix}bright (Limit)*
┣➥ *${usedPrefix}deepfry (Limit)*
┣➥ *${usedPrefix}filedelete (Limit)*
┣➥ *${usedPrefix}fire (Limit)*
┣➥ *${usedPrefix}fisheye (Limit)*
┣➥ *${usedPrefix}flip (Limit)*
┣➥ *${usedPrefix}flip2 (Limit)*
┣➥ *${usedPrefix}glass (Limit)*
┣➥ *${usedPrefix}grey (Limit)*
┣➥ *${usedPrefix}gtaposter (Limit)*
┣➥ *${usedPrefix}hd (Limit)*
┣➥ *${usedPrefix}enhance (Limit)*
┣➥ *${usedPrefix}iklan (Limit)*
┣➥ *${usedPrefix}poster (Limit)*
┣➥ *${usedPrefix}invert (Limit)*
┣➥ *${usedPrefix}kalender (Limit)*
┣➥ *${usedPrefix}komunis (Limit)*
┣➥ *${usedPrefix}laptop (Limit)*
┣➥ *${usedPrefix}memetext <teks|teks> (Limit)*
┣➥ *${usedPrefix}memegen <teks|teks> (Limit)*
┣➥ *${usedPrefix}nobg (reply/caption) (Limit)*
┣➥ *${usedPrefix}pelangi (Limit)*
┣➥ *${usedPrefix}rainbow (Limit)*
┣➥ *${usedPrefix}pensil (Limit)*
┣➥ *${usedPrefix}petir (Limit)*
┣➥ *${usedPrefix}rotate (Limit)*
┣➥ *${usedPrefix}run (Limit)*
┣➥ *${usedPrefix}sepia (Limit)*
┣➥ *${usedPrefix}sketch (Limit)*
┣➥ *${usedPrefix}skullmask (Limit)*
┣➥ *${usedPrefix}smile (Limit)*
┣➥ *${usedPrefix}senyum (Limit)*
┣➥ *${usedPrefix}thuglife (Limit)*
┣➥ *${usedPrefix}tobe (Limit)*
┣➥ *${usedPrefix}trigger (Limit)*
┣➥ *${usedPrefix}wanted <teks|teks> (Limit)*
┣➥ *${usedPrefix}warna <warna> (Limit)*
┣➥ *${usedPrefix}wasted (Limit)*
┃ 
┣━━°❀❬ *TQTO* ❭❀°━━┓
┃ 
┣➥ *Nurotomo (author)*
┣➥ *Ibnu NR (pengembang)*
┣➥ *RC047 (pengembang)*
┣➥ *Caliph (pengembang)*
┣➥ *Nanda Style*
┣➥ *Layscode*
┣➥ *Zeks*
┣➥ *Dll
┗━━━━━━━━━━━━━━━━
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['editormenu']
handler.tags = ['hsah']
handler.command = /^(editormenu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

