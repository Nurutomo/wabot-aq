/*
silahkan kamu buat menjadi lebih simpel :/
by ariffb & gani apel
*/
const { MessageType } = require("@adiwajshing/baileys")

let handler = async (m, { conn, text, usedPrefix }) => {
    const content = JSON.stringify(m.message)
    const type = Object.keys(m.message)[0]
    const isteks = type === 'conversation'
    if (!text && isteks) throw `contoh: \n\n${usedPrefix}upstory test`
    const isQuotedText = (type === 'extendedTextMessage' && content.includes('conversation'))
    const isVid = type === 'videoMessage'
    const isImage = type === 'imageMessage'
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
    const quotedTeks = isQuotedText ? m.quoted.text : false

    const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
    const encmediavid = isQuotedVideo ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m

    if (isteks && !isQuotedText) {
        conn.sendMessage('status@broadcast', text, MessageType.text)
    } else if (isQuotedText && quotedTeks) {
        conn.sendMessage('status@broadcast', quotedTeks, MessageType.text)
    }
    else if (isVid && !isQuotedVideo) {
        const buff = await conn.downloadMediaMessage(encmediavid)
        // await conn.sendMessage('status@broadcast', buff, MessageType.image, { caption: text })
        await conn.sendFile('status@broadcast', buff, 'wastatus.mp4', text, false, true)
    } else if (isImage && !isQuotedImage) {
        const buff = await conn.downloadMediaMessage(encmedia)
        // await conn.sendMessage('status@broadcast', buff, MessageType.image, { caption: text })
        await conn.sendFile('status@broadcast', buff, 'wastatus.jpg', text, false, true)
    } else if (isQuotedImage) {
        const buff = await conn.downloadMediaMessage(encmedia)
        // await conn.sendMessage('status@broadcast', buff, MessageType.image, { caption: text })
        await conn.sendFile('status@broadcast', buff, 'wastatus.jpg', text, false, true)
    } else if (isQuotedVideo) {
        const buff = await conn.downloadMediaMessage(encmediavid)
        // await conn.sendMessage('status@broadcast', buff, MessageType.image, { caption: text })
        await conn.sendFile('status@broadcast', buff, 'wastatus.mp4', text, false, true)
    }
}
handler.help = ['upsw [teks]']
handler.tags = ['owner']
handler.owner = true
handler.command = /^(ups(w|tory))$/i

module.exports = handler