let handler = async (m, { conn, args }) => {
 await conn.groupUpdateDescription(m.chat, `${args.join(" ")}`);
  m.reply('Sukses mengganti deskripsi group')
}

handler.help = ['Setdesk <text>']
handler.tags = ['group']
handler.command = /^setdesk$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = false
handler.admin = true
handler.botAdmin = true

module.exports = handler