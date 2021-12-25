let handler = async (m, { conn }) => {
      let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
      let warn = global.db.data.users[target].warn
      m.reply(`Kamu memiliki Total Warning : ${warn}`)
}

handler.help = ['Cekwarn @user']
handler.tags = ['group']
handler.command = /^cekwarn$/i

handler.group = true

module.exports = handler