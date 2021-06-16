let handler = async (m, { conn, text, participants }) => {
  let users = participants.map(u => u.jid)
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  let msg = conn.cMod(
    m.chat,
    conn.prepareMessageFromContent(
      m.chat,
      { [q.mtype]: c.toJSON ? c.toJSON() : c },
      {
        contextInfo: {
          mentionedJid: users
        }
      }
    ),
    text || q.text
  )
  await conn.relayWAMessage(msg)
}
handler.help = ['pengumuman','hidetag'].map(v => 'o' + v + ' [teks]')
handler.tags = ['owner']
handler.command = /^(opengumuman|oannounce|ohiddentag|ohidetag)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
