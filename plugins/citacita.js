let fetch = require("node-fetch")
let arr = []
let handler = async (m, { conn }) => {
  if (!arr) arr = (await (await fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')).text()|| '').split('\n')
  let cita = arr[Math.floor(Math.random() * arr.length)]
  if (!cita) throw false
  await conn.sendFile(m.chat, cita, cita, null, m, true, { mimetype: 'audio/mp4' })
}
handler.customPrefix = /^cita ?cita$/i
handler.command = new RegExp

module.exports = handler
