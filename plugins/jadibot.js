let { WAConnection: _WAConnection, MessageType } = require('@adiwajshing/baileys')
let WAConnection = require('../lib/simple').WAConnection(_WAConnection)
let qrcode = require('qrcode')

if (global.conns instanceof Array) console.log()// for (let i of global.conns) global.conns[i] && global.conns[i].user ? global.conns[i].close().then(() => delete global.conns[id] && global.conns.splice(i, 1)).catch(global.conn.logger.error) : delete global.conns[i] && global.conns.splice(i, 1)
else global.conns = []

let handler  = async (m, { conn, args, usedPrefix, command }) => {
  if (global.conn.user.jid == conn.user.jid) {
    let id = global.conns.length
    let conn = new WAConnection()
    if (args[0] && args[0].length > 400) conn.loadAuthInfo(JSON.parse(Buffer.from(args[0], 'base64').toString()))
    conn.on('qr', async qr => {
      global.conn.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 20 detik',m)
    })
    conn.once('connection-validated', user => {
      global.conn.reply(m.chat, 'Berhasil tersambung dengan WhatsApp Anda.\n*NOTE: kalo bot aku mati, bot kamu juga.*\n' + JSON.stringify(user, null, 2), m)
    })
    conn.on('message-new', global.conn.handler)
    conn.regenerateQRIntervalMs = null
    conn.connect().then(({user}) => {
      global.conn.sendMessage(user.jid, `Nanti kalo mau login lagi\n*${usedPrefix + command} ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}*`, MessageType.extendedText)
    })
    setTimeout(() => {
      if (conn.user) return
      conn.close()
      delete global.conns[id]
    }, 60000)
    global.conns.push(conn)
  } else conn.reply(m.chat, 'Tidak bisa membuat bot didalam bot!\n\nhttps://wa.me/' + global.conn.user.jid.split`@`[0] + '?text=.jadibot', m)
}
handler.command = /^jadibot$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

