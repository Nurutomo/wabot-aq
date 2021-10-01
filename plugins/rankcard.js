// Created by Rizxyu
// Edited by @Kokoronationz

let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let fs = require('fs')

let handler  = async (m, { conn, text }) => {
	let pp = './src/avatar_contact.png'

let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
let nama = conn.getName(m.sender)
try {
  } catch (e) {

  } finally {
let res = global.API('http://hardianto-chan.herokuapp.com', '/api/rankcard', {
    profile: await conn.getProfilePicture(m.sender).catch(_ => ''),
    name: nama,
    bg: 'https://a-static.besthdwallpaper.com/violet-evergarden-wallpaper-3440x1440-947_15.jpg',
    needxp: max,
    curxp: exp,
    level: level,
    logorank: await conn.getProfilePicture(m.chat).catch(_ => '')
  })
let caption = `
*👾Your Profile:*

*👤Name:* ${nama}
*⚜️Rank:* ${role}
*🔰Level:* ${level}
*🔗Exp :* ${exp} --> ${max}
`.trim()
    conn.sendFile(m.chat, res, 'test.jpg', caption, m, false)
} 
    
    }
handler.help = ['rank','rankcard']
handler.tags = ['main']
handler.command = /^(rank|rankcard)$/i

handler.register = true
handler.fail = null

module.exports = handler

//dicuri oleh saya >\\<
