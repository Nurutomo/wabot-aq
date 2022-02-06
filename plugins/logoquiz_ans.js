const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*hint/i.test(m.quoted.contentText)) return !0
  this.logoquiz = this.logoquiz ? this.logoquiz : {}
  if (!(id in this.logoquiz)) return m.reply('Soal itu telah berakhir')
  if (m.quoted.id == this.logoquiz[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.logoquiz[id][1]))
    if (['.hints', 'Bantuan', ''].includes(m.text)) return !0
    if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
      global.db.data.users[m.sender].exp += this.logoquiz[id][2]
      await this.sendButton(m.chat, `*Benar!* +${this.logoquiz[id][2]} XP`, '© idilBot', 'Logo Quiz', '.logoquiz', m)
      clearTimeout(this.logoquiz[id][3])
      delete this.logoquiz[id]
    } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler
