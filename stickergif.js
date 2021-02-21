const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { MessageType } = require('@adiwajshing/baileys')

/*
made with love, by Ariffb
http://wa.me/6283128734012 

jangan lupa install package ffmpeg nya
npm i fluent-ffmpeg

JANGAN DIHAPUS YA, TERIMAKASIH
*/
let handler = async (m, { conn, args, usedPrefix }) => {
    const type = Object.keys(m.message)[0]
    const content = JSON.stringify(m.message)
    const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
    if ((isMedia && !m.message.videoMessage || isQuotedImage) && args.length == 0) {
        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        const media = await conn.downloadAndSaveMediaMessage(encmedia)
        const ran = getRandom('.webp')
        await ffmpeg(`./${media}`)
            .input(media)
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                m.reply('Error!')
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
    } else if ((isMedia && m.message.videoMessage.seconds < 11 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        const media = await conn.downloadAndSaveMediaMessage(encmedia)
        const ran = getRandom('.webp')
        await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                m.reply(`\`\`\`Gagal, pada saat mengkonversi ${tipe} ke stiker\`\`\``)
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        const media = await conn.downloadAndSaveMediaMessage(encmedia)
        ranw = getRandom('.webp')
        ranp = getRandom('.png')
        keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
        await removeBackgroundm.chatImageFile({ path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp }).then(res => {
            fs.unlinkSync(media)
            let buffer = Buffer.m.chat(res.base64img, 'base64')
            fs.writeFileSync(ranp, buffer, (err) => {
                if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
            })
            exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                fs.unlinkSync(ranp)
                if (err) return m.reply('Error!')
                buff = fs.readFileSync(ranw)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
            })
        })
    } else {
        reply(`Kirim gambar dengan caption ${usedPrefix}sticker2 atau tag gambar yang sudah dikirim`)
    }
}
handler.help = ['stiker2 (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(st2|stic?ker2|gif|gifstic?ker|stic?kergif)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { MessageType } = require('@adiwajshing/baileys')

/*
made with love, by Ariffb
http://wa.me/6283128734012 

JANGAN DIHAPUS YA, TERIMAKASIH
*/
let handler = async (m, { conn, args, usedPrefix }) => {
    const type = Object.keys(m.message)[0]
    const content = JSON.stringify(m.message)
    const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
    if ((isMedia && !m.message.videoMessage || isQuotedImage) && args.length == 0) {
        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        const media = await conn.downloadAndSaveMediaMessage(encmedia)
        const ran = getRandom('.webp')
        await ffmpeg(`./${media}`)
            .input(media)
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                m.reply('Error!')
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
    } else if ((isMedia && m.message.videoMessage.seconds < 11 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        const media = await conn.downloadAndSaveMediaMessage(encmedia)
        const ran = getRandom('.webp')
        await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                m.reply(`\`\`\`Gagal, pada saat mengkonversi ${tipe} ke stiker\`\`\``)
            })
            .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        const media = await conn.downloadAndSaveMediaMessage(encmedia)
        ranw = getRandom('.webp')
        ranp = getRandom('.png')
        keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
        await removeBackgroundm.chatImageFile({ path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp }).then(res => {
            fs.unlinkSync(media)
            let buffer = Buffer.m.chat(res.base64img, 'base64')
            fs.writeFileSync(ranp, buffer, (err) => {
                if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
            })
            exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                fs.unlinkSync(ranp)
                if (err) return m.reply('Error!')
                buff = fs.readFileSync(ranw)
                conn.sendMessage(m.chat, buff, MessageType.sticker, { quoted: m })
            })
        })
    } else {
        reply(`Kirim gambar dengan caption ${usedPrefix}sticker2 atau tag gambar yang sudah dikirim`)
    }
}
handler.help = ['stiker2 (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(st2|stic?ker2|gif|gifstic?ker|stic?kergif)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}