const fs = require('fs')
const { exec } = require('child_process')

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
        if (/video|audio/.test(mime)) {
            let media = await q.download()
            let ran = getRandom('.mp3')
            exec(`ffmpeg -i ${media} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) throw `_*Error!*_`
                let buff = fs.readFileSync(ran)
                conn.sendFile(m.chat, buff, ran, null, m, null)
                fs.unlinkSync(ran)
            })
        } else throw `Balas video atau voice note yang ingin diubah ke mp3 dengan caption *${usedPrefix + command}*`
    } catch (e) {
        throw e
    }
}
handler.help = ['tomp3']
handler.tags = ['audio']
handler.command = /^(tomp3)$/i
module.exports = handler


const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
