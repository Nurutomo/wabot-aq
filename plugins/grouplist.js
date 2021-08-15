let handler = async (m, { conn }) => {
  let group = conn.chats.all().filter(v => v.jid.endsWith('g.us'))
  let txt = ''
  for (let v of group) txt += `${await conn.getName(v.jid)}\n${v.jid} [${v.read_only ? 'Left' : 'Joined'}]\n\n`
  m.reply( 'List Groups:\n' + txt.trim())
}
handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(gro?up(s|list)|listgro?ups?)$/i

module.exports = handler

