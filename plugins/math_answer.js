let handler = m => m
handler.before = async function (m) {
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
  let id = m.chat
  if (!m.quoted || m.quoted.sender != this.user.jid || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
  this.math = this.math ? this.math : {}
  if (!(id in this.math)) return m.reply('That question has ended')
  if (m.quoted.id == this.math[id][0].id) {
    let math = JSON.parse(JSON.stringify(this.math[id][1]))
    if (m.text == math.result) {
      global.DATABASE._data.users[m.sender].exp += math.bonus
      clearTimeout(this.math[id][3])
      delete this.math[id]
      m.reply(`*Correct answer!*\n+${math.bonus} XP`)
    } else {
      if (--this.math[id][2] == 0) {
        clearTimeout(this.math[id][3])
        delete this.math[id]
        m.reply(`*Chance ran out!*\nAnswer: *${math.result}*`)
      } else m.reply(`*Wrong answer!*\nThere are still ${this.math[id][2]} chances`)
    }
  }
  return !0
}

module.exports = handler
