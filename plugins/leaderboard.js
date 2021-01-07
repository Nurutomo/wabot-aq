let handler = async (m, { conn, args }) => {
  let sorted = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].exp - a[1].exp)
  let users = sorted.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(100, sorted.length)
  let text = `
• *Leaderboard Top ${len}* •
Kamu: *${users.indexOf(m.sender) + 1}* dari *${users.length}*

${sorted.slice(0, len).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + ': *' + data.exp + ' Exp*').join`\n`}
`.trim()
  conn.reply(m.chat, text, m, {
    contextInfo: {
      mentionedJid: users.slice(0, len)
    }
  })
}
handler.help = ['leaderboard [jumlah user]']
handler.tags = ['xp']
handler.command = /^(leaderboard)$/i
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

