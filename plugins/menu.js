let handler  = async (m, { conn, usedPrefix: _p }) => {
  let preview = await conn.generateLinkPreview('https://github.com/Nurutomo/wabot-aq')
  conn.reply(m.chat, {...preview, text: `
• ----- Menu ----- •
${more.repeat(1000)}
Universal:
${_p}menu
${_p}qr <teks>
${_p}stiker (caption)
${_p}bucin
${_p}ssweb <url>
${_p}sswebf <url>
${_p}google <pencarian>
${_p}googlef <pencarian>
${_p}readmore <teks>|<sembunyi>

Group:
${_p}add nomor1,nomor2,dst
${_p}kick @mention
${_p}promote @mention
${_p}demote @mention
${_p}linkgrup
${_p}pengumuman <teks>
${_p}hidetag <teks>
${_p}listonline [groupid]
${_p}grouplist

Experimental:
${_p}jadibot [kode login jika ada / kosongin]

Advanced:
> return m

• ----- Info ----- •
Coded using *Vim* on Android \\w Termux
by *@Nurutomo*
https://github.com/Nurutomo/wabot-aq
• ---------------- •
`.trim()}, m)
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

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
