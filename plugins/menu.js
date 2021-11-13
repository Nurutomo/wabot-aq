let { performance } = require('perf_hooks')
let util = require('util')
let fetch = require('node-fetch');
let { MessageType, mentionedJid } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
const moment = require('moment-timezone')
let PhoneNumber = require('awesome-phonenumber')
let fs = require ('fs')
let path = require('path')

let handler  = async (m, { conn, usedPrefix: _p }) => {

let old = performance.now()
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
  	const bars = global.DATABASE.data.chats[m.sender]
  var zerobars = '[▒▒▒▒▒▒▒▒▒]'

         if (bars >= '0' && bars <= '5') {
                zerobars = '[▒▒▒▒▒▒▒▒▒▒]'
         } else if (bars >= '5' && bars <= '10') {
				zerobars = '[█▒▒▒▒▒▒▒▒▒]'
		 } else if (bars >= '10' && bars <= '20') {
				zerobars = '[██▒▒▒▒▒▒▒▒]'
		} else if (bars >= '20' && bars <= '30') {
				zerobars = '[███▒▒▒▒▒▒▒]'
		} else if (bars >= '30' && bars <= '40') {
				zerobars = '[████▒▒▒▒▒▒]'
		} else if (bars >= '40' && bars <= '50') {
				zerobars = '[█████▒▒▒▒▒]'
		} else if (bars >= '50' && bars <= '60') {
				zerobars = '[██████▒▒▒▒]' 
		} else if (bars >= '60' && bars <= '70') {
				zerobars = '[███████▒▒▒]'
		} else if (bars >= '70' && bars <= '80') {
				zerobars = '[████████▒▒]'
		} else if (bars >= '80' && bars <= '90') {
				zerobars = '[█████████▒]'
		} else if (bars >= '90' && bars <= '100') {
				zerobars = '[██████████]'
		} else { 
				zerobars = '[██████████]'
		} 

const jam = moment.tz('Asia/Jakarta').format('HH')

 var ucapanWaktu = 'Selamat Pagi 🌄'



				if (jam >= '03' && jam <= '10') {

				ucapanWaktu = 'Selamat Pagi 🌄'

				} else if (jam >= '10' && jam <= '13') {

				ucapanWaktu = 'Selamat Siang ☀️'

				} else if (jam >= '13' && jam <= '18') {

				ucapanWaktu = 'Selamat Sore 🌅'

				} else if (jam >= '18' && jam <= '23') {

				ucapanWaktu = 'Selamat Malam 🌙'

				} else {

				ucapanWaktu = 'Selamat Malam 🌙'

				}

const freply = {key:{ fromMe:false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: {



					"productMessage": {

						"product": {

							"productImage": {

								"url": "https://mmg.whatsapp.net/d/f/Am1sSqpVypFpsQawFUFkm4HgkPRqEx8rt32niyBmL4Wa.enc",

								"mimetype": "image/jpeg",

								"fileSha256": "KbJC20DoVEdDw+8WF1EqwtPsdPUTF8/xQbhg+65P3q4=",

								"fileLength": "43344",

								"height": 1080,

								"width": 1080,

								"mediaKey": "cX+6c20dws6B++0slmMNXcCk7omK+zvheoN6087j9nl=",

								"fileEncSha256": "BGO1C/OttoScb1UxDrGlwsI9eImocg1zwbLgYKmecXs=",

								"directPath": "/v/t62.7118-24/20036572_1210576852672540_4032358369544328852_n.enc?oh=d0e477e1bf0a01bfcf328776ab50ccee&oe=6043238E",

								"mediaKeyTimestamp": "1612168223",

								"jpegThumbnail": global.thumbnail ? global.thumbnail : Buffer.alloc(0)

		},

							"productId": "3872465552870232",

							"title": `Battery : ${zerobars}`,

							"description" : `${ucapanWaktu}`,

	"productImageCount": 1

						},

						"businessOwnerJid": "6283162388082@s.whatsapp.net"}}}    

let package = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))

    let { exp, limit, level, role, age, money, registered, healt, coin, tigame } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)

    let name = registered ? global.DATABASE.data.users[m.sender].name : conn.getName(m.sender)

    let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
        let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let battery = ['100','99','98','97','96','95','94','93','92','91','90','89','88','87','86','85','84','83','82','81','80','79','78','77','76','75','74','73','72','71','70','69','68','67','66','65','64','63','62','61','60','59','58','57','56','55','54','53','52','51','50','49','48','47','46','45','44','43','42','41','40','39','38','37','36','35','34','33','32','31','30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1'][Math.floor(((d * 1) + gmt) / 8460) % 100]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    const dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
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

    let _uptime = process.uptime() * 1000

    let _muptime

    if (process.send) {

      process.send('uptime')

      _muptime = await new Promise(resolve => {

        process.once('message', resolve)

        setTimeout(resolve, 1000)

      }) * 1000

    }

    let muptime = clockString(_muptime)

    let uptime = clockString(_uptime)

    let totalreg = Object.keys(global.DATABASE._data.users).length
    let totalgc = Object.keys(global.DATABASE._data.chats).length

    let rtotalreg = 0

    try {

    

    rtotalreg = Object.values(global.DATABASE._data.users).filter(user => user.registered == true).length

    } catch {

  

    }

  

let tags = {
  'main': 'Start Bot',
      'daftar': 'Daftar',
      'abs': 'Absensi Menu', 
      'xp': 'Exp & Limit',
      'rpg': 'Adventure Menu (NEW)', 
      'tutor': 'Tutorial Buat Ndaa BOTZ',
      'hadiah': 'Hadiah',
      'dewasa': '18+ Menu',
      'database': 'Database',
      'group': 'Group Menu',
      'anime': 'Anime Menu',
      'panik': 'Prank Menu',
      'cs': 'Custom Sticker',
      'sticker': 'Creator Menu',
      'game': 'Fun Menu',
      'image': 'Image Menu',
      'videomaker': 'Video Menu',
      'anony': 'Anonymous Chat',
      'audio': 'Audio Menu', 
      'sound': 'Sound Menu',
      'quotes': 'Random Menu',
      'primbon': 'Primbon Menu',
      'belajar': 'Education Menu',
      'music': 'Music Menu',
      'simi': 'Simsimi Menu',
      'kerang': 'Kerang Menu',
      'downloader': 'Downloader Menu',
      'news': 'News Menu',
      'spam': 'Spammer Menu',
      'tools': 'Tools Menu',
      'jadibot': 'Bot Numpang',
      'premium': 'Premium & VIP Menu',
      'owner': 'Owner Menu',
      'host': 'Host Menu',
      'info': 'Information',
      'thnks': 'THANKS TO',
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

    let before = conn.menu.before || `
Hello %name
Im *R-BOT* And You Use 
Prefix *%p*

❏ Ｉｎｆｏ Ｂｏｔ
▷ Bot Name : *${conn.getName(conn.user.jid)}*
▷ Mention : @${m.sender.replace(/@.+/, '')}
▷ Version : 10.7
▷ Battery : %battery
▷ Battery Bars : ${zerobars}
▷ Prefix : 『 %p 』
▷ Total Features : 983+


❏ Ｉｎｆｏ Ｕｓｅｒ
▷ UserName : %name
▷ Age : ${registered ? '' + age : ''}
▷ Phone Number : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
▷ Registered : ${registered ? 'Yes': 'No'}
▷ Role : %role
▷ Health : %healt
▷ Coin : %coin
▷ Money : RP %money
▷ Ticket : %limit
▷ Game Limit : %tigame
▷ Level : %level
▷ Exp : %exp
▷ Exp To Levelup : %xp4levelup
▷ Total Exp : %totalexp


❏ Ｄａｔｅ ＆ Ｔｉｍｅ
▷ Day : %week
▷ Date : %date
▷ Weton : %weton
▷ Islamic Date : ${dateIslamic}
▷ Time : %time WIB
▷ Time : ${wit} WIT
▷ Time : ${wita} WITA


❏ Ｄａｔａ
▷ Uptime : %uptime
▷ Main Uptime : %muptime
▷ Users In Database : %totalreg Users
▷ Registered : %rtotalreg
▷ Total GC : %totalgc
%readmore

`
    let header = conn.menu.header || '╭─「 %category 」'

    let body   = conn.menu.body   || '│ • %cmd%islimit'

    let footer = conn.menu.footer || '╰────\n'

    let after  = conn.menu.after  || (conn.user.jid == global.conn.user.jid ? '' : `Powered By @${global.conn.user.jid.split`@`[0]}`) + `\n*%npmname@^%version*\n\`\`\`\%npmdesc\`\`\``

    let _text  = before + '\n'

    for (let tag in groups) {

      _text += header.replace(/%category/g, tags[tag]) + '\n'

      for (let menu of groups[tag]) {

        for (let help of menu.help)

          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (Limit)' : '')  + '\n'

      }

      _text += footer + '\n'

    }

    _text += after

    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''

    let replace = {

      '%': '%',

      p: _p, uptime, muptime,

      npmname: package.name,

      npmdesc: package.description,

      version: package.version,

      exp: exp - min,

      maxexp: xp,

      totalexp: exp,

      xp4levelup: max - exp,

      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',

      level, limit, name, weton, week, date, time, totalreg, totalgc, rtotalreg, role, healt, money, battery, coin, tigame, 

      readmore: readMore

    }

    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => ''+replace[name])

    ppnya = global.thumbnail ? global.thumbnail : Buffer.alloc(0)

    
   conn.sendMessage(m.chat, text.trim(), 'extendedTextMessage', { detectLinks: false, thumbnail: ppnya, quoted: freply, contextInfo : { mentionedJid: conn.parseMention(text),

    externalAdReply: {

                    title: `BOT WHATSAPP SIMPLE`,

                    body: `${ucapanWaktu} ${name}`,

                    mediaType: 2,

                    thumbnailUrl: await conn.getProfilePicture(conn.user.jid),

                    mediaUrl: 'https://i.ibb.co/fHDx30X/20210725-125918.jpg'

                }

}})

  } catch (e) {

    conn.reply(m.chat, 'Maaf, Menu Kami Sedang Error, Silahkan Coba Lagi Nanti', m)
    conn.send2Button(m.chat, 'di pilih', 'hai', 'Menu', '.menu', 'owner', '.Owner')
    throw e

  }

}
handler.help = ['allmenu']
handler.tags = ['kd']
handler.command = ['allmenu']
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = false

module.exports = handler

const more = String.fromCharCode(8206)

const readMore = more.repeat(4001)



function clockString(ms) {

  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)

  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60

  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60

  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')

}