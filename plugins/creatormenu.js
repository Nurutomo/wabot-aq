let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, usedPrefix }) => {

  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, banned, lastclaim, registered, regTime, age, level } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let str = `
┏━━°❀❬ *USER PROFILE* ❭❀°━━┓
┃
┃•  *Nama :* ${username}
┃•  *Umur :* ${registered ? '' + age : ''}
┃•  *Exp :* ${exp}
┃[${max - exp} lagi untuk levelup]
┃•  *Tiket :* ${limit} 🎟️
┃•  *Level :* ${level}
┃•  *Nomor :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃•  *Api Whatsapp :* wa.me/${who.split`@`[0]}
┃•  *Terdaftar :* ${registered ? 'Yes': 'No'}
┃
┣━━°❀❬ *SIMPEL MENU* ❭❀°━━┓
┃
┣➥ *${usedPrefix}textpro 3dluxury <teks|teks>*
┣➥ *${usedPrefix}textpro 3dgradient <teks|teks>*
┣➥ *${usedPrefix}textpro blackpink <teks|teks>*
┣➥ *${usedPrefix}textpro realisticvintage <teks|teks>*
┣➥ *${usedPrefix}textpro 3dmetalgold <teks|teks>*
┣➥ *${usedPrefix}textpro 3dmetalgalaxy <teks|teks>*
┣➥ *${usedPrefix}textpro lionlogomascot <teks|teks>*
┣➥ *${usedPrefix}textpro wolflogoblackwhite <teks|teks>*
┣➥ *${usedPrefix}textpro ninjalogo <teks|teks>*
┣➥ *${usedPrefix}textpro toxictext <teks|teks>*
┣➥ *${usedPrefix}textpro jokerlogo <teks|teks>*
┣➥ *${usedPrefix}textpro wicker <teks|teks>*
┣➥ *${usedPrefix}textpro naturalleaves <teks|teks>*
┣➥ *${usedPrefix}textpro fireworksparkle <teks|teks>*
┣➥ *${usedPrefix}textpro skeleton <teks|teks>*
┣➥ *${usedPrefix}textpro redfoilballon <teks|teks>*
┣➥ *${usedPrefix}textpro goldfoilballon <teks|teks>*
┣➥ *${usedPrefix}textpro steel <teks|teks>*
┣➥ *${usedPrefix}textpro ultragloss <teks|teks>*
┣➥ *${usedPrefix}textpro denim <teks|teks>*
┣➥ *${usedPrefix}textpro decorategreen <teks|teks>*
┣➥ *${usedPrefix}textpro decoratepurple <teks|teks>*
┣➥ *${usedPrefix}textpro peridotstone <teks|teks>*
┣➥ *${usedPrefix}textpro rock <teks|teks>*
┣➥ *${usedPrefix}textpro lava <teks|teks>*
┣➥ *${usedPrefix}textpro yellowglass <teks|teks>*
┣➥ *${usedPrefix}textpro purpleglass <teks|teks>*
┣➥ *${usedPrefix}textpro orangeglass <teks|teks>*
┣➥ *${usedPrefix}textpro greenglass <teks|teks>*
┣➥ *${usedPrefix}textpro cyanglass <teks|teks>*
┣➥ *${usedPrefix}textpro blueglass <teks|teks>*
┣➥ *${usedPrefix}textpro redglass <teks|teks>*
┣➥ *${usedPrefix}textpro purpleshnyglass <teks|teks>*
┣➥ *${usedPrefix}textpro captainamerica <teks|teks>*
┣➥ *${usedPrefix}textpro robotr2d2 <teks|teks>*
┣➥ *${usedPrefix}textpro toxic <teks|teks>*
┣➥ *${usedPrefix}textpro rainbowequalizer <teks|teks>*
┣➥ *${usedPrefix}textpro pinksparklingjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro bluesparklingjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro greensparklingjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro purplesparklingjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro goldsparklingjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro redsparklingjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro cyansparklingjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro realisticcloud <teks|teks>*
┣➥ *${usedPrefix}textpro cloudsky <teks|teks>*
┣➥ *${usedPrefix}textpro sandsummerbeach <teks|teks>*
┣➥ *${usedPrefix}textpro sandwriting <teks|teks>*
┣➥ *${usedPrefix}textpro purpleglass2 <teks|teks>*
┣➥ *${usedPrefix}textpro decorativeglass <teks|teks>*
┣➥ *${usedPrefix}textpro chocolatecake <teks|teks>*
┣➥ *${usedPrefix}textpro strawberry <teks|teks>*
┣➥ *${usedPrefix}textpro koifish <teks|teks>*
┣➥ *${usedPrefix}textpro bread <teks|teks>*
┣➥ *${usedPrefix}textpro matrixstyle <teks|teks>*
┣➥ *${usedPrefix}textpro hororrblood <teks|teks>*
┣➥ *${usedPrefix}textpro 3dchrome <teks|teks>*
┣➥ *${usedPrefix}textpro 3dglowingmetal <teks|teks>*
┣➥ *${usedPrefix}textpro blackmetal <teks|teks>*
┣➥ *${usedPrefix}textpro bluegem <teks|teks>*
┣➥ *${usedPrefix}textpro honey <teks|teks>*
┣➥ *${usedPrefix}textpro plasticbagdrug <teks|teks>*
┣➥ *${usedPrefix}textpro horrorgift <teks|teks>*
┣➥ *${usedPrefix}textpro marbleslabs <teks|teks>*
┣➥ *${usedPrefix}textpro advancedglow <teks|teks>*
┣➥ *${usedPrefix}textpro dropwater <teks|teks>*
┣➥ *${usedPrefix}textpro breakwall <teks|teks>*
┣➥ *${usedPrefix}textpro chrismastgift <teks|teks>*
┣➥ *${usedPrefix}textpro roadwarning <teks|teks>*
┣➥ *${usedPrefix}textpro 3dsteel <teks|teks>*
┣➥ *${usedPrefix}textpro bokeh <teks|teks>*
┣➥ *${usedPrefix}textpro greenneon <teks|teks>*
┣➥ *${usedPrefix}textpro neonlight <teks|teks>*
┣➥ *${usedPrefix}textpro thunder <teks|teks>*
┣➥ *${usedPrefix}textpro 3dbox <teks|teks>*
┣➥ *${usedPrefix}textpro neon4 <teks|teks>*
┣➥ *${usedPrefix}textpro rustymetal <teks|teks>*
┣➥ *${usedPrefix}textpro fruitjuice <teks|teks>*
┣➥ *${usedPrefix}textpro icecold <teks|teks>*
┣➥ *${usedPrefix}textpro marble <teks|teks>*
┣➥ *${usedPrefix}textpro scifi <teks|teks>*
┣➥ *${usedPrefix}textpro bagel <teks|teks>*
┣➥ *${usedPrefix}textpro biscuit <teks|teks>*
┣➥ *${usedPrefix}textpro abstragold <teks|teks>*
┣➥ *${usedPrefix}textpro shinymetal <teks|teks>*
┣➥ *${usedPrefix}textpro purplegem <teks|teks>*
┣➥ *${usedPrefix}textpro metalrainbow <teks|teks>*
┣➥ *${usedPrefix}textpro wood <teks|teks>*
┣➥ *${usedPrefix}textpro sandengraved <teks|teks>*
┣➥ *${usedPrefix}textpro summerysandwriting <teks|teks>*
┣➥ *${usedPrefix}textpro balloontext <teks|teks>*
┣➥ *${usedPrefix}textpro 3dglue <teks|teks>*
┣➥ *${usedPrefix}textpro purplejewelry <teks|teks>*
┣➥ *${usedPrefix}textpro redjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro silverjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro yellowjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro bluejewelry <teks|teks>*
┣➥ *${usedPrefix}textpro cyanjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro greenjewelry <teks|teks>*
┣➥ *${usedPrefix}textpro orangejewelry <teks|teks>*
┣➥ *${usedPrefix}textpro purpleglitter <teks|teks>*
┣➥ *${usedPrefix}textpro blueglitter <teks|teks>*
┣➥ *${usedPrefix}textpro hexagolden <teks|teks>*
┣➥ *${usedPrefix}textpro hotmetal <teks|teks>*
┣➥ *${usedPrefix}textpro goldglitter <teks|teks>*
┣➥ *${usedPrefix}textpro greenglitter <teks|teks>*
┣➥ *${usedPrefix}textpro silverglitter <teks|teks>*
┣➥ *${usedPrefix}textpro pinkglitter <teks|teks>*
┣➥ *${usedPrefix}textpro bluemetal <teks|teks>*
┣➥ *${usedPrefix}textpro pinkcandy <teks|teks>*
┣➥ *${usedPrefix}textpro erodedmetal <teks|teks>*
┣➥ *${usedPrefix}textpro bronzeglitter <teks|teks>*
┣➥ *${usedPrefix}textpro 1917 <teks|teks>*
┣➥ *${usedPrefix}textpro neon <teks|teks>*
┣➥ *${usedPrefix}textpro snowtext <teks|teks>*
┣➥ *${usedPrefix}textpro cloudtext <teks|teks>*
┣➥ *${usedPrefix}textpro space3d <teks|teks>*
┣➥ *${usedPrefix}textpro metaldarkgold <teks|teks>*
┣➥ *${usedPrefix}textpro glitch <teks|teks>*
┣➥ *${usedPrefix}textpro neongalaxy <teks|teks>*
┣➥ *${usedPrefix}textpro minion3d <teks|teks>*
┣➥ *${usedPrefix}textpro holographic3d <teks|teks>*
┣➥ *${usedPrefix}textpro metalpurpledual <teks|teks>*
┣➥ *${usedPrefix}textpro deluxesilver <teks|teks>*
┣➥ *${usedPrefix}textpro glossybluemetal <teks|teks>*
┣➥ *${usedPrefix}textpro deluxegold <teks|teks>*
┣➥ *${usedPrefix}textpro glossycarbon <teks|teks>*
┣➥ *${usedPrefix}textpro fabric <teks|teks>*
┣➥ *${usedPrefix}textpro stone <teks|teks>*
┣➥ *${usedPrefix}textpro ph <teks|teks>*
┣➥ *${usedPrefix}textpro 3davengers <teks|teks>*
┣➥ *${usedPrefix}textpro marvelstudios <teks|teks>*
┣➥ *${usedPrefix}textpro marvel <teks|teks>*
┣➥ *${usedPrefix}textpro happnewyearfirework <teks|teks>*
┣➥ *${usedPrefix}textpro newyear3d <teks|teks>*
┣➥ *${usedPrefix}textpro neontext <teks|teks>*
┣➥ *${usedPrefix}textpro helloweenfire <teks|teks>*
┣➥ *${usedPrefix}textpro bloodontheroastedglass <teks|teks>*
┣➥ *${usedPrefix}textpro xmas3d <teks|teks>*
┣➥ *${usedPrefix}textpro 3dmetalsilver <teks|teks>*
┣➥ *${usedPrefix}textpro pinkfoilballon <teks|teks>*
┣➥ *${usedPrefix}textpro greenfoilballon <teks|teks>*
┣➥ *${usedPrefix}textpro cyanfoilballon <teks|teks>*
┣➥ *${usedPrefix}textpro bluefoilballon <teks|teks>*
┣➥ *${usedPrefix}advancedglow <teks>* (Limit)
┣➥ *${usedPrefix}aglitertext (Limit)
┣➥ *${usedPrefix}amongus <teks>* (Limit)
┣➥ *${usedPrefix}attp <teks>* (Limit)
┣➥ *${usedPrefix}attp2 <teks>* (Limit)
┣➥ *${usedPrefix}attp3 <teks>* (Limit)
┣➥ *${usedPrefix}avengers <teks|teks>* (Limit)
┣➥ *${usedPrefix}banner <text>* (Limit)
┣➥ *${usedPrefix}logo <text>* (Limit)
┣➥ *${usedPrefix}battlefield <teks|teks>* (Limit)
┣➥ *${usedPrefix}bintang <teks>* (Limit)
┣➥ *${usedPrefix}bloodtext <teks>* (Limit)
┣➥ *${usedPrefix}bocilff <teks>* (Limit)
┣➥ *${usedPrefix}bplogo <teks>* (Limit)
┣➥ *${usedPrefix}breakwall <teks>* (Limit)
┣➥ *${usedPrefix}burningtext (Limit)
┣➥ *${usedPrefix}burnpaper <teks>* (Limit)
┣➥ *${usedPrefix}carbontext <teks>* (Limit)
┣➥ *${usedPrefix}cloudtext <teks>* (Limit)
┣➥ *${usedPrefix}cod <teks|teks>* (Limit)
┣➥ *${usedPrefix}coffetext <teks>* (Limit)
┣➥ *${usedPrefix}comictext (Limit)
┣➥ *${usedPrefix}customtahta <teks>* (Limit)
┣➥ *${usedPrefix}cstahta <teks>* (Limit)
┣➥ *${usedPrefix}darkneon <teks>* (Limit)
┣➥ *${usedPrefix}dropwater <teks>* (Limit)
┣➥ *${usedPrefix}dropwater2 <teks>* (Limit)
┣➥ *${usedPrefix}ephoto <effect|teks>* (Limit)
┣➥ *${usedPrefix}fbplaybutton <teks>* (Limit)
┣➥ *${usedPrefix}fflogo <teks>* (Limit)
┣➥ *${usedPrefix}fflogo2 <teks>* (Limit)
┣➥ *${usedPrefix}ffserti <teks>* (Limit)
┣➥ *${usedPrefix}firetext <teks>* (Limit)
┣➥ *${usedPrefix}firework <teks>* (Limit)
┣➥ *${usedPrefix}flametext <teks>* (Limit)
┣➥ *${usedPrefix}football <teks>* (Limit)
┣➥ *${usedPrefix}futureneon <teks>* (Limit)
┣➥ *${usedPrefix}gaminglogo <teks>* (Limit)
┣➥ *${usedPrefix}glitchtext <teks|teks>* (Limit)
┣➥ *${usedPrefix}glitertext <teks|teks>* (Limit)
┣➥ *${usedPrefix}glowtext <teks>* (Limit)
┣➥ *${usedPrefix}glowtext2 <teks>* (Limit)
┣➥ *${usedPrefix}gplaybutton <teks>* (Limit)
┣➥ *${usedPrefix}gsuggest <teks|teks|teks>* (Limit)
┣➥ *${usedPrefix}gtattp <teks|teks>* (Limit)
┣➥ *${usedPrefix}hackerserti <teks>* (Limit)
┣➥ *${usedPrefix}hackertext <teks>* (Limit)
┣➥ *${usedPrefix}harrypotter <teks>* (Limit)
┣➥ *${usedPrefix}intro <teks>* (Limit)
┣➥ *${usedPrefix}jokerlogo <teks>* (Limit)
┣➥ *${usedPrefix}ktp <nik|prov|kabu|name|ttl|jk|jl|rtrw|lurah|camat|agama|nikah|kerja|warga|until|url>* (Limit)
┣➥ *${usedPrefix}leavetext <teks>* (Limit)
┣➥ *${usedPrefix}lionlogo <teks|teks>* (Limit)
┣➥ *${usedPrefix}logomarvel <teks|teks>* (Limit)
┣➥ *${usedPrefix}lolbanner <teks>* (Limit)
┣➥ *${usedPrefix}love <teks>* (Limit)
┣➥ *${usedPrefix}lovecoffe <teks>* (Limit)
┣➥ *${usedPrefix}magernulis <nama|kls|teks>* (Limit)
┣➥ *${usedPrefix}mlserti <teks>* (Limit)
┣➥ *${usedPrefix}naruto <teks>* (Limit)
┣➥ *${usedPrefix}neon <teks>* (Limit)
┣➥ *${usedPrefix}neontext <teks>* (Limit)
┣➥ *${usedPrefix}nexustext <teks|teks|teks>* (Limit)
┣➥ *${usedPrefix}ninjalogo <teks|teks>* (Limit)
┣➥ *${usedPrefix}nulis2 <teks>* (Limit)
┣➥ *${usedPrefix}nulis3 <teks>* (Limit)
┣➥ *${usedPrefix}nulis4 <teks>* (Limit)
┣➥ *${usedPrefix}nulis5 <arah|teks>* (Limit)
┣➥ *${usedPrefix}pantaitext <teks>* (Limit)
┣➥ *${usedPrefix}phcomment <nama|teks>* (Limit)
┣➥ *${usedPrefix}phlogo <teks|teks>* (Limit)
┣➥ *${usedPrefix}photooxy <effect|teks>* (Limit)
┣➥ *${usedPrefix}polio <arah|teks>* (Limit)
┣➥ *${usedPrefix}pubglogo <teks|teks>* (Limit)
┣➥ *${usedPrefix}pubgserti <teks>* (Limit)
┣➥ *${usedPrefix}qr <teks>*
┣➥ *${usedPrefix}qrcode <teks>*
┣➥ *${usedPrefix}quotemaker <teks|wm|bg>* (Limit)
┣➥ *${usedPrefix}sbburn <teks>* (Limit)
┣➥ *${usedPrefix}semoji <teks>*
┣➥ *${usedPrefix}semoji2 <teks>*
┣➥ *${usedPrefix}semoji3 <tipe|emoji>* (Limit)
┣➥ *${usedPrefix}shaketext (Limit)
┣➥ *${usedPrefix}snowtext <teks|teks>* (Limit)
┣➥ *${usedPrefix}snowtext2 <teks>* (Limit)
┣➥ *${usedPrefix}spiderman <teks|teks>* (Limit)
┣➥ *${usedPrefix}splaybutton <teks>* (Limit)
┣➥ *${usedPrefix}sticker
┣➥ *${usedPrefix}stickergif
┣➥ *${usedPrefix}sgif
┣➥ *${usedPrefix}style <query|teks>* (Limit)
┣➥ *${usedPrefix}tahta <teks>* (Limit)
┣➥ *${usedPrefix}tahta2<teks>* (Limit)
┣➥ *${usedPrefix}text3d <teks>* (Limit)
┣➥ *${usedPrefix}textpro <effect>* <text|text>* (Limit)
┣➥ *${usedPrefix}thundertext <teks>* (Limit)
┣➥ *${usedPrefix}tololserti <teks>* (Limit)
┣➥ *${usedPrefix}tovideo (reply sticker) (Limit)
┣➥ *${usedPrefix}toxictext <teks>* (Limit)
┣➥ *${usedPrefix}trumpcomment <teks>* (Limit)
┣➥ *${usedPrefix}ttp <teks>*
┣➥ *${usedPrefix}ttp2 <teks>*
┣➥ *${usedPrefix}ttp3 <teks>*
┣➥ *${usedPrefix}ttp4 <teks>*
┣➥ *${usedPrefix}ttp5 <teks>*
┣➥ *${usedPrefix}ttp6 <teks>*
┣➥ *${usedPrefix}ultah <teks>* (Limit)
┣➥ *${usedPrefix}underwater <teks>* (Limit)
┣➥ *${usedPrefix}valorant <teks|teks|teks>* (Limit)
┣➥ *${usedPrefix}wallgravity <teks>* (Limit)
┣➥ *${usedPrefix}wolflogo <teks|teks>* (Limit)
┣➥ *${usedPrefix}woodtext <teks>* (Limit)
┣➥ *${usedPrefix}ytcomment <nama|teks>* (Limit)
┃ 
┣━━°❀❬ *TQTO* ❭❀°━━┓
┃ 
┣➥ *Nurotomo (author)*
┣➥ *Ibnu NR (pengembang)*
┣➥ *RC047 (pengembang)*
┣➥ *Caliph (pengembang)*
┣➥ *Nanda Style*
┣➥ *Layscode*
┣➥ *Zeks*
┣➥ *Dll
┗━━━━━━━━━━━━━━━━
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['creatormenu']
handler.tags = ['smnu']
handler.command = /^(creatormenu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler


