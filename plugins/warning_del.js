let handler = async (m) => {
  let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  if (!mention) throw `Tag/mention orangnya!`
  let warn = global.db.data.users[mention].warn
  if (warn > 0) {
    global.db.data.users[mention].warn -= 1
    m.reply('⚠️ *WARNING -1*')
    m.reply(`Admin mengurangi warn kamu, warn kamu sekarang ${warn - 1}`, mention)
  } else if (warn == 0) {
    m.reply('User tidak memiliki warn')
  }
}

handler.help = ['Delwarn @user']
handler.tags = ['group']
handler.command = /^delwarn$/i

handler.group = true
handler.admin = true

module.exports = handler