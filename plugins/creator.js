function handler(m) {
  // This is just an example, don't uncomment it -_-
  // F this.sendContact(m.chat, '917829302695', 'Narayan', m)
  this.sendContact(m.chat, '917829302695', 'Narayan', m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
