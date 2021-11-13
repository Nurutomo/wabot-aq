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
┏━━°❀❬ *MUSIC MENU* ❭❀°━━┓
┃
┣➥ *${usedPrefix}chord <lagu> (Limit)*
┣➥ *${usedPrefix}joox <lagu> (Limit)*
┣➥ *${usedPrefix}joox2 <lagu> (Limit)*
┣➥ *${usedPrefix}playjoox <lagu> (Limit)*
┣➥ *${usedPrefix}lirik <lagu> (Limit)*
┣➥ *${usedPrefix}play <link> (Limit)*
┣➥ *${usedPrefix}playmusic <link> (Limit)*
┣➥ *${usedPrefix}playaudio <link> (Limit)*
┗━━━━━━━━━━━━━━━━
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['musicmenu']
handler.tags = ['jj']
handler.command = /^(musicmenu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

