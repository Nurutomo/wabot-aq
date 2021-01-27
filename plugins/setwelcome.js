let handler = async (m, { conn, text }) => {
  if (text) {
    conn.welcome = text
    m.reply('Welcome berhasil diatur\n@user (Mention)')
  } else throw 'Teksnya mana?'
}
handler.help = ['setwelcome <teks>']
handler.tags = ['owner']

handler.command = /^setwelcome$/i
module.exports = handler

