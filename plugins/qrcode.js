let qrcode = require("qrcode")

let handler  = async (m, { conn, args }) => {
  conn.sendFile(m.chat, await qrcode.toDataURL(args.join(' '), { scale: 8 }), 'qrcode.png', '¯\\_(ツ)_/¯', m)
}
handler.command = /^qr(code)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

