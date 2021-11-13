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
┃[${max - exp} lagi untuk levelup]
┃•  *Limit :* ${limit}
┃•  *Level :* ${level}
┃•  *Nomor :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃•  *Api Whatsapp :* wa.me/${who.split`@`[0]}
┃•  *Terdaftar :* ${registered ? 'Yes': 'No'}
┃
┣━━°❀❬ *SIMPEL MENU* ❭❀°━━┓
┃
┣➥ *${usedPrefix}add <nomor> (Limit)*
┣➥ *${usedPrefix}+ <nomor> (Limit)*
┣➥ *${usedPrefix}afk <alasan>*
┣➥ *${usedPrefix}del (Limit)*
┣➥ *${usedPrefix}delete (Limit)*
┣➥ *${usedPrefix}demote @user*
┣➥ *${usedPrefix}member @user*
┣➥ *${usedPrefix}↓ @user*
┣➥ *${usedPrefix}fitnah <teks> @user <teks>*
┣➥ *${usedPrefix}getpp @user*
┣➥ *${usedPrefix}group <open/close>*
┣➥ *${usedPrefix}infogrup*
┣➥ *${usedPrefix}kick @user (Limit)*
┣➥ *${usedPrefix}- @user (Limit)*
┣➥ *${usedPrefix}leave*
┣➥ *${usedPrefix}keluar*
┣➥ *${usedPrefix}linkgroup*
┣➥ *${usedPrefix}listadmin*
┣➥ *${usedPrefix}here*
┣➥ *${usedPrefix}listonline*
┣➥ *${usedPrefix}enable <option>*
┣➥ *${usedPrefix}disable <option>*
┣➥ *${usedPrefix}pengumuman [teks] (Limit)*
┣➥ *${usedPrefix}announce [teks] (Limit)*
┣➥ *${usedPrefix}hidetag [teks] (Limit)*
┣➥ *${usedPrefix}promote @user*
┣➥ *${usedPrefix}admin @user*
┣➥ *${usedPrefix}↑ @user*
┣➥ *${usedPrefix}revoke*
┣➥ *${usedPrefix}resetlink*
┣➥ *${usedPrefix}setdesk <teks>*
┣➥ *${usedPrefix}setname <nama>*
┣➥ *${usedPrefix}setpp*
┣➥ *${usedPrefix}seticon*
┣➥ *${usedPrefix}setpptext*
┣➥ *${usedPrefix}seticontext*
┣➥ siapa <pertanyaan>?*
┣➥ siapakah <pertanyaan>?*
┣➥ *${usedPrefix}tagall <pesan>*
┣➥ *${usedPrefix}mentionall <pesan>*
┣➥ *${usedPrefix}tagme*
┣➥ *${usedPrefix}tampar @user (Limit)*
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
handler.help = ['grupmenu']
handler.tags = ['hh']
handler.command = /^(grupmenu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler


