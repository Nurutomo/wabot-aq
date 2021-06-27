const moment = require('moment-timezone')
let fs = require('fs')
let handler = m => m

handler.all = async function (m) {
    const menit = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    if (menit.endsWith('00:00')) {
        let d = new Date
        let date = d.toLocaleDateString('id', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        let time = d.toLocaleTimeString('id')
        await global.DATABASE.save()
        this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${time} ${date}`, null)
        this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync(`./database.json`), `database.json`, '', false, false, { mimetype: 'application/json' })
    }
}

module.exports = handler
