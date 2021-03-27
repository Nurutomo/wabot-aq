let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*hint/i.test(m.quoted.text)) return
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  if (!(id in conn.tebakgambar)) return m.reply('Soal itu telah berakhir')
  if (m.quoted.id == conn.tebakgambar[id][0].id) {
    let json = JSON.parse(JSON.stringify(conn.tebakgambar[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
      global.DATABASE._data.users[m.sender].exp += conn.tebakgambar[id][2]
      m.reply(`*Benar!*\n+${conn.tebakgambar[id][2]} XP`)
      clearTimeout(conn.tebakgambar[id][3])
      delete conn.tebakgambar[id]
    } else if (m.text.toLowerCase().endsWith(json.jawaban.split` `[1])) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
}
handler.exp = 0

module.exports = handler
