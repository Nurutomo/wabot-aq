let handler = async (m, { conn, text }) => {
 conn.reply(m.chat, `
*I Love You* ${pickRandom(['100% 😍💖 *On 100%*','90% 😘💕 *On 100%*','80% 💕 *On 100%*','70% 😍 *On 100%*','60% 😙 *On 100%*','50% 😗 *On 100%*','40% 😐 *On 100%*','30% 😑 *On 100%*','20% 😖 *On 100%*','10% 😣 *On 100%*','0% 😤 *On 100%*'])}
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['love']
handler.tags = ['game']
handler.command = /^love$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

/* Codded By TOXIC-DEVIL
# wabot-aq
## Nurutomo/wabot-aq
LICENSED UNDER = GNU General Public */
