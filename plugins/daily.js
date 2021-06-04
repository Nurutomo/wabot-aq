const free = 500
let handler = async (m) => {
  if (new Date - global.DATABASE._data.users[m.sender].lastclaim < 86400000) throw 'Anda sudah mengklaim klaim harian hari ini'
  global.DATABASE._data.users[m.sender].exp += free
  m.reply(`+${free} XP`)
  global.DATABASE._data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['daily', 'claim']
handler.tags = ['xp']
handler.command = /^(daily|claim)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

