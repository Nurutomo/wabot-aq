let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/gay', {
    avatar: await conn.getProfilePicture(who).catch(_ => ''),
  }), 'gay.png', 'siapa disini yang cita citanya menjadi gay dan memperkosa gw gays?', m)
}

handler.help = ['gay']
handler.tags = ['maker']

handler.command = /^(gay)$/i

module.exports = handler
