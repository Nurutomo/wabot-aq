let fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
        throw false
    }
    let res = await fetch(global.API('zahir', '/api/kuis/caklontong', {}, 'apikey'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    let caption = `
${json.result.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}calo untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.caklontong[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.caklontong[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.result.jawaban}*\n${json.result.deskripsi}`, conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i

module.exports = handler