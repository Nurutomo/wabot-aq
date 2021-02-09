const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { spawn } = require('child_process')
const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, text }) => {
  if (text) {
    let stiker = await sticker(null, global.API('xteam', '/ttp', { file: '', text }))
    conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  }
}
handler.help = ['ttp <teks>']
handler.tags = ['sticker']
handler.command = /^ttp$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

let tmp = path.join(__dirname, '../tmp')
function sticker(img, url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (url) {
        let res = await fetch(url)
        if (res.status !== 200) throw await res.text()
        img = await res.buffer()
      }
      let inp = path.join(tmp, +new Date + '.jpeg')
      let png = path.join(tmp, +new Date + '.png')
      let out = path.join(tmp, +new Date + '.webp')
      fs.writeFileSync(inp, img)
      spawn('ffmpeg', [
        '-y',
        '-i', inp,
        '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
        png
      ])
      .on('error', reject)
      .on('close', () => {
        fs.unlinkSync(inp)
        spawn('convert', [png, out])
        .on('error', reject)
        .on('close', () => {
          try {
            fs.unlinkSync(png)
            resolve(fs.readFileSync(out))
            if (fs.existSync(out)) fs.unlinkSync(out)
          } catch (e) { reject(e) }
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}
