const fetch = require('node-fetch')
const FormData = require('form-data')
const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, 'Tag stikernya!', m)
  let q = { message: { [m.quoted.mtype]: m.quoted }}
  if (/sticker/.test(m.quoted.mtype)) {
    let sticker = await conn.downloadM(q)
    if (!sticker) throw sticker
    let img = await toimg(sticker)
    conn.sendMessage(m.chat, img, MessageType.image, {
      quoted: m
    })
  }
}
handler.command = /^toimg$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

async function canvas(code, type = 'png', quality = 0.92) {
    let res = await fetch('https://nurutomo.herokuapp.com/api/canvas?' + queryURL({
        type,
        quality
    }), {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': code.length
        },
        body: code
    })
    let image = await res.buffer()
    return image
}

function queryURL(queries) {
    return Object.entries(queries).map(([key, value]) => key + (value ? '=' + encodeURIComponent(value) : '')).join('&')
}

let { fromBuffer } = require('file-type')
async function toimg(img) {
    let url = await uploadImage(img)
    let mime = 'image/webp'
    let sc = `let im = await loadImg('data:${mime};base64,'+(await window.loadToDataURI('${url}')))
w = c.width = im.width
h = c.height = im.height
ctx.drawImage(im, 0, 0, w, h)
`
    return await canvas(sc)
}

function uploadImage(buffer) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                ext
            } = await fromBuffer(buffer)
            let form = new FormData()
            form.append('file', buffer, 'tmp.' + ext)
            let res = await fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: form
            })
            let img = await res.json()
            if (img.error) reject(img.error)
            else resolve('https://telegra.ph' + img[0].src)
        } catch (e) {
            reject(e)
        }
    })
}
