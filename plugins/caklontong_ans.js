const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
        let id = m.chat
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*calo/i.test(m.quoted.contentText)) return !0
        this.caklontong = this.caklontong ? this.caklontong : {}
        if (!(id in this.caklontong)) return m.reply('Soal itu telah berakhir')
        if (m.quoted.id == this.caklontong[id][0].id) {
            let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
            if (['.ao', 'Bantuan', ''].includes(m.text)) return !0
            if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                global.db.data.users[m.sender].exp += this.caklontong[id][2]
                await this.sendButton(m.chat, `*Benar!* +${this.caklontong[id][2]} XP\n${json.deskripsi}`, author, 'Cak Lontong', '.caklontong', m)
                clearTimeout(this.caklontong[id][3])
                delete this.caklontong[id]
            } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
            else m.reply(`*Salah!*`)
        }
        return !0
    },
    exp: 0
}
