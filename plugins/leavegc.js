/* Codded By TOXIC-DEVIL

## Contribution - 17th
## wabot -aq
## Nurutomo/wabot -aq
## https://github.com/Nurutomo/wabot-aq

GNU General Public License v3.0 */

let handler = async (m, { conn, usedPrefix, command }) => {

  await m.reply(`
*bye bye teman-teman saya keluar dari grup ini 😓*
`.trim())

 conn.groupLeave(m.chat)
}
handler.help = ['leavegc']
handler.tags = ['group']

handler.command = /^leavegc$/i

handler.group = true
handler.owner = true

module.exports = handler 
