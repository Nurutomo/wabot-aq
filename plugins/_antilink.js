let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    m.reply('Hapus!!\n\nLink Grup terdeteksi')
   this.groupRemove(m.chat, [m.sender])
  }
}
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler
