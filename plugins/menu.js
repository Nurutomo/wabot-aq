let handler  = async (m, { usedPrefix }) => {
  conn.reply(m.chat, `
∆ Menu ∆
${usedPrefix}menu
${usedPrefix}
`.trim(), m)
}
handler.command = /^menu|help$/i
handler.group = false
handler.private = false

module.exports = handler

