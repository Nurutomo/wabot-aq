const fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Perintah ini untuk mengambil stiker dari Telegram*\n\ncontoh:\n${usedPrefix + command} https://t.me/addstickers/menggokil`
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `*Link salah! Perintah ini untuk mengambil stiker dari Telegram*\n\ncontoh:\n${usedPrefix + command} https://t.me/addstickers/menggokil`

    let res = await fetch(global.API('zeks', '/api/telegram-sticker', { url: args[0] }, 'apikey'))
    if (res.status != 200) throw await `${res.status} ${res.statusText}`
    let json = await res.json()
    if (!json.status) throw json
    let mes = json.result.map((v, i) => `${i + 1}. ${v}`).join('\n')
    m.reply(`*Total:* ${json.result.length}\n*Estimasi selesai:* ${json.result.length * 2} detik\n\n` + mes)
    for (let i of json.result) {
        stiker = await sticker(false, i, global.packname, global.author)
        await conn.sendMessage(m.chat, stiker, MessageType.sticker, { quoted: m })
        await delay(2000)
    }
}
handler.help = ['stikertelegram <url>']
handler.tags = ['sticker']
handler.command = /^(stic?kertele(gram)?)$/i

handler.limit = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))