let handler = function (m) {
  // this.sendContact(m.chat, '94754273991', 'Nurutomo', m)
  this.sendContact(m.chat, '0', '94754273991', m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
