let handler  = async (m, { conn, usedPrefix: _p }) => {
  try {
    let exp = global.DATABASE.data.users[m.sender].exp
    let limit = global.DATABASE.data.users[m.sender].limit
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
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
    let _uptime = new Date(new Date - global.timestamp.start)
    let uptime = ['getHours','getMinutes','getSeconds'].map(method => _uptime[method]().toString().padStart(2, 0)).join`:`
    let tags = {
      'main': 'Main',
      'xp': 'Exp & Limit',
      'sticker': 'Sticker',
      'kerang': 'Kerang Ajaib',
      'quotes': 'Quotes',
      'admin': 'Admin',
      'group': 'Group',
      'downloader': 'Downloader',
      'tools': 'Tools',
      'jadibot': 'Jadi Bot',
      'owner': 'Owner',
      'host': 'Host',
      'advanced': 'Advanced',
      'info': 'Info',
      '': 'No Category',
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
        if (menu.tags && menu.tags.includes(tag))
          if (menu.help) groups[tag].push(menu)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || `${conn.getName(conn.user.jid)} • Bot\n\nHai, %name!\n*%exp XP*\n*%limit Limit*\n*%week %weton, %date*\n*%time*\n%readmore`
    let header = conn.menu.header || '╭─「 %category 」'
    let body   = conn.menu.body   || '│ • %cmd%islimit'
    let footer = conn.menu.footer || '╰────\n'
    let after  = conn.menu.after  || conn.user.jid == global.conn.user.jid ? '' : `\nPowered by https://wa.me${global.conn.user.jid}`
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (Limit)' : '')  + '\n'
      }
      _text += footer + '\n'
    }
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p,
      exp, limit, name, weton, week, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.reply(m.chat, text.trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu','help','?']
handler.tags = ['main']
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

