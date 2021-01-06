let handler  = async (m, { conn, usedPrefix: _p }) => {
  let preview = {}
  try {
    if (!conn.menu) preview = await conn.generateLinkPreview('https://github.com/Nurutomo/wabot-aq')
  } catch (e) {
    try {
      if (!conn.menu) preview = await global.conn.generateLinkPreview('https://github.com/Nurutomo/wabot-aq')
    } catch (e) {}
  } finally {
    let exp = global.DATABASE.data.users[m.sender].exp
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id-Id'
    let weton = ['Pon','Wage','Kliwon','Legi','Pahing'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let text =  conn.menu ? conn.menu
      .replace(/%p/g, _p)
      .replace(/%exp/g, exp)
      .replace(/%name/g, name)
      .replace(/%weton/g, weton)
      .replace(/%week/g, week)
      .replace(/%date/g, date)
      .replace(/%time/g, time): `
• ----- *Menu* ----- •
Hi, ${name}!
Exp: ${exp}
_${time} ${week} ${weton}, ${date}_
${more.repeat(1000)}
+1 Exp/pesan biasa
+10 Exp/command

Universal:
${_p}menu
${_p}qr <teks>
${_p}stiker (caption)
${_p}stiker <url>
${_p}toimg (reply)
${_p}bucin
${_p}ssweb <url>
${_p}sswebf <url>
${_p}google <pencarian>
${_p}googlef <pencarian>
${_p}readmore <teks>|<sembunyi>

Exp:
${_p}leaderboard <jumlah user>

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
${_p}berhenti
${_p}getcode

Owner Nomor:
${_p}bcgc <teks>
${_p}setmenu <teks> (Semua tanda %p diubah menjadi prefix bot)
${_p}deletechat (chat ini)
${_p}deletechat group (semua grup kecuali yang di pin)
${_p}mutechat (chat ini)
${_p}mutechat group (semua grup kecuali yang di pin)
Advanced:
> return m

• ----- Info ----- •
Coded using *Vim* on Android \\w Termux
by *@Nurutomo*
https://github.com/Nurutomo/wabot-aq
Request/Tanya Fitur: https://t.me/wabotermux
• ---------------- •
`.trim()
    conn.reply(m.chat, {...preview, text}, m)
  }
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
/*                                                                                                     ╭─「 𝗠𝗲𝗱𝗶𝗮 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 」
│ • #memes                                                                                           │ • #asupan ⚡
│ • #ajg
│ • #bcl                                                                                             │ • #koceng
│ • #pokemon                                                                                         ╰────

╭─「 𝗪𝗶𝗯𝘂 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 」                                                                                │ • #loli
│ • #shota ⚡                                                                                        │ • #waifu
│ • #hentai ⚡
│ • #husbu                                                                                           │ • #nekoNime ⚡
│ • #randomBlowjob ⚡
│ • #randomCry ⚡
│ • #randomHug ⚡                                                                                    │ • #randomKiss ⚡
│ • #malAnime
│ • #malCharacter
│ • #whatAnime
╰────
╭─「 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 」
│ • #infoGempa                                                                                       │ • #cuaca                                                                                           │ • #covidIndo
│ • #checkIP ⚡
╰────
╭─「 𝗢𝘁𝗵𝗲𝗿 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 」                                                                               │ • #artiNama
│ • #artiMimpi ⚡                                                                                    │ • #artiZodiak ⚡                                                                                   │ • #ramalPasangan                                                                                   │ • #nomorHoki)
*/

