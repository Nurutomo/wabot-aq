let handler = async (m, { text, usedPrefix }) => {
    let poin = 300
    let salah = `Pilihan yang tersedia Gunting, Kertas, Batu\n\n*Contoh* : ${usedPrefix}suit gunting\n`
    if (!text) throw salah
    var suit = Math.random()

    if (suit < 0.34) {
        suit = 'batu'
    } else if (suit > 0.34 && suit < 0.67) {
        suit = 'gunting'
    } else {
        suit = 'kertas'
    }

    //menentukan rules
    if (text == suit) {
      global.db.data.users[m.sender].exp += 100
        m.reply(`*Kita Seri*\n\nkamu : ${text}\nBot : ${suit}\n\nPoin (±)100 XP`)
    } else if (text == 'batu') {
        if (suit == 'gunting') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`*Kamu Menang*\n\nkamu : ${text}\nBot : ${suit}\n\nPoin (+)${poin} XP`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`*Kamu Kalah*\n\nkamu : ${text}\nBot : ${suit}\n\nPoin (-)${poin} XP`)
        }
    } else if (text == 'gunting') {
        if (suit == 'kertas') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`*Kamu Menang*\n\nkamu : ${text}\nBot : ${suit}\n\nPoin (+)${poin} XP`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`*Kamu Kalah*\n\nkamu : ${text}\nBot : ${suit}\n\nPoin (-)${poin} XP`)
        }
    } else if (text == 'kertas') {
        if (suit == 'batu') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`*Kamu Menang*\n\nkamu : ${text}\nBot : ${suit}\n\nPoin (+)${poin} XP`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`*Kamu Kalah*\n\nkamu : ${text}\nBot : ${suit}\n\nPoin (-)${poin} XP`)
        }
    } else {
        throw salah
    }
}
handler.help = ['Suit gunting/batu/kertas']
handler.tags = ['game']
handler.command = /^suit$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = false
handler.admin = false
handler.botAdmin = false

module.exports = handler