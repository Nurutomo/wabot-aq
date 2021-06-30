const fs = require('fs')
const { exec } = require('child_process')

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
        if (/audio/.test(mime)) {
            let media = await conn.downloadAndSaveMediaMessage(q)
            let ran = getRandom('.mp3')
            exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) throw `_*Error!*_`
                let buff = fs.readFileSync(ran)
                conn.sendFile(m.chat, buff, ran, null, m, true, { quoted: m, mimetype: 'audio/mp4' })
                fs.unlinkSync(ran)
            })
        } else throw `Balas vn/audio yang ingin diubah dengan caption *${usedPrefix + command}*`
    } catch (e) {
        throw e
    }
}
handler.help = ['tupai']
handler.tags = ['audio']
handler.command = /^(tupai|squirrel|chipmunk)$/i

module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}