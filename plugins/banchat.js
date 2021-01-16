let handler = async (m, { conn }) => {
  global.DATABASE._data.chats[m.chat].isBanned = true
  m.reply('Done!')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.owner = true

module.exports = handler
