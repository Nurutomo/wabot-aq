let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    if (isROwner) global.conn.welcome = text
    else if (isOwner) conn.welcome = text
    else global.DATABASE._data.chats.sWelcome = text
    m.reply('Welcome berhasil diatur\n@user (Mention)\n@subject (Judul Grup)')
  } else throw 'Teksnya mana?'
}
handler.help = ['setwelcome <teks>']
handler.tags = ['owner', 'group']

handler.command = /^setwelcome$/i
module.exports = handler

