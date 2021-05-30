let handler = function (m) {
  if (!m.quoted) throw false
  let { fromMe, id, isBaileys } = m.quoted
  if (!fromMe) throw false
  if (!isBaileys) throw 'The message is not sent by a bot!'
  this.deleteMessage(m.chat, {
    fromMe,
    id,
    remoteJid: m.chat
  })
}
handler.help = ['del', 'delete']
handler.tags = ['info']

handler.command = /^del(ete)?$/i

module.exports = handler
