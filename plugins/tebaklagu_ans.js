const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
        let id = m.chat
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK JUDUL LAGU/i.test(m.quoted.text)) return !0
        this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
        if (!(id in this.tebaklagu)) return m.reply('Soal itu telah berakhir')
        if (m.quoted.id == this.tebaklagu[id][0].id) {
            let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
            // m.reply(JSON.stringify(json, null, '\t'))
            if (m.text.toLowerCase() == json.judul.toLowerCase().trim()) {
                global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
                m.reply(`*Benar!*\n+${this.tebaklagu[id][2]} XP`)
                clearTimeout(this.tebaklagu[id][3])
                delete this.tebaklagu[id]
            } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
            else m.reply(`*Salah!*`)
        }
        return !0
    },
    exp: 0
}
