let handler  = async (m, { conn, usedPrefix: _p }) => {
  conn.reply(m.chat, `
∆ Menu ∆
${_p}menu
${_p}qr <teks>
${_p}stiker (caption)
${_p}bucin

Group:
${_p}add nomor1,nomor2,dst
${_p}kick @mention
${_p}promote @mention
${_p}demote @mention
${_p}linkgrup
${_p}pengumuman <teks>
${_p}listonline [groupid]
${_p}grouplist

Experimental:
${_p}jadibot [kode login jika ada / kosongin]

Advanced:
> return 'javascript eval ' + m.sender
`.trim(), m)
}
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

