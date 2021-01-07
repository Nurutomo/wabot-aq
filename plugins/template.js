let handler = async (m, { conn }) => {
  return false
}
handler.help = [''].map(v => v + ' <>')
handler.tags = ['']
handler.command = /^(.{65536})$/i
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

