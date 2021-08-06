let handler = async (m, { conn, text }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (teks) conn.sendFile(m.chat, global.API('xteam', '/attp', { file: '', text: teks }), 'attp.webp', '', m, false, { asSticker: true })
  else throw `Tanpa Teks!`
}
handler.help = ['attp <teks>']
handler.tags = ['sticker']

handler.command = /^attp$/i

module.exports = handler
