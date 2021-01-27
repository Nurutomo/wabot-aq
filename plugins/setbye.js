let handler = async (m, { conn, text }) => {
  if (text) {
    conn.welcome = text
    m.reply('Bye berhasil diatur\n@user (Mention)')
  } else throw 'Teksnya mana?'
}
handler.help = ['setbye <teks>']
handler.tags = ['owner']

handler.command = /^setbye$/i
module.exports = handler

