const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, participants }) => {
  let users = participants.map(u => u.jid)
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  let msg = conn.cMod(
    m.chat,
    conn.prepareMessageFromContent(
      m.chat,
      { [c.toJSON ? q.mtype : MessageType.extendedText]: c.toJSON ? c.toJSON() : {
        text: c || ''
      } },
      {
        contextInfo: {
          mentionedJid: users
        },
        quoted: false
      }
    ),
    text || q.text 
  )
  await conn.relayWAMessage(msg)
}
handler.help = ['pengumuman', 'announce', 'hidetag'].map(v => 'o' + v + ' [teks]')
handler.tags = ['group']
handler.command = /^o(pengumuman|announce|hiddentag|hidetag)$/i

handler.owner = true
handler.group = true

module.exports = handler
