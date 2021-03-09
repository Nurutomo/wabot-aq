let util = require('util')
let path = require('path')
let { spawn } = require('child_process')

// Magernulis By MFarelS:V
let handler  = async (m, { conn, text }) => {
  let d = new Date
  let tgl = d.toLocaleDateString('id-Id')
  let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
 text,
await conn.sendFile(m.chat, global.API('xteam', '/magernulis4', { text, }, 'APIKEY'), 'nulis.jpg', 'Dah jadi Bosquee tulisanmu\nSubscribe: *Drawl Nag*', m)
}
handler.help = ['magern'].map(v => v + 'ulis4 (tulisan)')
handler.tags = ['nulis']
handler.command = /^magernulis4$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.register = true

module.exports = handler
