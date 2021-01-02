let fetch = require('node-fetch')
let handler = async (m, { conn, command, args }) => {
  let full = /f$/i.test(command)
  if (!args[0]) return conn.reply(m.chat, 'Tidak ada url', m)
  let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = await (await fetch('https://nurutomo.herokuapp.com/api/ssweb?delay=1000&url=' + encodeURIComponent(url) + '&full=' + full)).buffer()
  conn.sendFile(m.chat, ss, 'screenshot.png', url, m)
}
handler.command = /^ss(web)?f?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

