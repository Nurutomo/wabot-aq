let handler = async (m, { conn, args, groupMetadata }) => {
      let target = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
      let warn = global.db.data.users[target].warn
      m.reply(`Kamu memiliki Total Warning : ${warn}`)
}

handler.help = ['Cekwarn @user']
handler.tags = ['group']
handler.command = /^cekwarn$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = false
handler.admin = false
handler.botAdmin = true

module.exports = handler