let handler = async (m, { conn, args, usedPrefix, command }) => {

  await conn.groupUpdateSubject(m.chat, `${args.join(" ")}`);
  m.reply('Sukses mengganti nama group')
}

handler.help = ['Setname <text>']
handler.tags = ['group']
handler.command = /^setname$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = false
handler.admin = true
handler.botAdmin = true

module.exports = handler