let { WAConnection: _WAConnection, MessageType } = require('@adiwajshing/baileys')
let WAConnection = require('../lib/simple').WAConnection(_WAConnection)
let qrcode = require('qrcode')

if (global.conns instanceof Array) for (let conn of global.conns) conn.close().then(() => delete global.conns[global.conns.indexOf(conn)]).catch(global.conn.logger.error)
else global.conns = []

let handler  = async (m, { conn }) => {
  if (global.conn.user.jid == conn.user.jid) {
    let id = global.conns.length
    let conn = new WAConnection()
    conn.on('qr', async qr => {
      global.conn.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 20 detik',m)
    })
    conn.on('connection-validated', user => global.conn.reply(m.chat, 'Berhasil tersambung dengan WhatsApp Anda.\n*NOTE: kalo bot aku mati, bot kamu juga.*\n' + JSON.stringify(user, null, 2), m))
    conn.on('message-new', global.conn.handler)
    conn.regenerateQRIntervalMs = null
    conn.connect()
    setTimeout(() => {
      if (conn.user) return
      conn.close()
      delete global.conns[id]
    }, 60000)
    global.conns.push(conn)
  } else conn.reply(m.chat, 'Tidak bisa membuat bot didalam bot!', m)
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

