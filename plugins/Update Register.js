const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `You are already registered\nWant to re-register? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Incorrect format\n*${usedPrefix}register name.age*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Name cannot be empty (Alphanumeric)'
  if (!age) throw 'Age cannot be empty (Number)Age cannot be empty (Number)'
  age = parseInt(age)
  if (age > 120) throw 'Age too old , Pleas Go and dead😂'
  if (age < 5) throw 'Babies can type according to the bjir format ._.'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`Success√`)
  let regis =`┍━━━━━━━━━━━━━━━
│ᏒᎬᎶᎥᏕᏖᎬᏒ ᏟᎧᎷᏞᎬᏆᎬᎠ
│───────────────
│ *•NAME* : ${name}
│ *•AGE* : ${age} Years old
┕━━━━━━━━━━━━━━━
  SERIAL NUMBER:-\n${sn}
  `.trim()
   conn.sendFile(m.chat, pp, 'pp.jpg', regis, m)
   }
    }
handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['exp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler

