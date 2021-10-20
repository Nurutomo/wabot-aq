const uploadImage = require('../lib/uploadImage')
let handler = async (m, { conn, text }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  await conn.sendFile(m.chat, global.API('xteam', '/videomaker/poly', { text: teks }, 'APIKEY'), 'poly.mp4', teks, m)
}
handler.help = ['poly'].map((v) => v + " <text>")
handler.tags = ['videomaker']

handler.command = /^poly$/i

module.exports = handler
