let handler = async (m, { conn }) => {
  return false
}
handler.command = /^(.{65536})$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

