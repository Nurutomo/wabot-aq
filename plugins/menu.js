let handler  = async (m, { usedPrefix: _p }) => {
  conn.reply(m.chat, `
∆ Menu ∆
${_p}menu
${_p}qr <teks>
${_p}stiker (kadang rusak)

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

