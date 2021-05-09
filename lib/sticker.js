const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { spawn } = require('child_process')
const { fromBuffer } = require('file-type')
const uploadImage = require('./uploadImage')
const uploadFile = require('./uploadFile')

const tmp = path.join(__dirname, '../tmp')
/**
 * Image to Sticker
 * @param {Buffer} img Image Buffer
 * @param {String} url Image URL
 */
function sticker2(img, url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (url) {
        let res = await fetch(url)
        if (res.status !== 200) throw await res.text()
        img = await res.buffer()
      }
      let inp = path.join(tmp, +new Date + '.jpeg')
      let png = inp + '.png'
      let out = png + '.webp'
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
          fs.unlinkSync(png)
          resolve(fs.readFileSync(out))
          fs.unlinkSync(out)
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}

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
    return new URLSearchParams(Object.entries(queries))
}

/**
 * Image to Sticker
 * @param {Buffer} img Image Buffer
 * @param {String} url Image URL
 */
async function sticker1(img, url) {
    url = url ? url : await uploadImage(img)
    let {
        mime
    } = url ? {mime:'image/jpeg'} : await fromBuffer(img)
    let sc = `let im = await loadImg('data:${mime};base64,'+(await window.loadToDataURI('${url}')))
c.width = c.height = 512
let max = Math.max(im.width, im.height)
let w = 512 * im.width / max
let h = 512 * im.height / max
ctx.drawImage(im, 256 - w / 2, 256 - h / 2, w, h)
`
    return await canvas(sc, 'webp')
}

/**
 * Image/Video to Sticker
 * @param {Buffer} img Image/Video Buffer
 * @param {String} url Image/Video URL
 * @param {String} packname EXIF Packname
 * @param {String} author EXIF Author
 */
async function sticker3(img, url, packname, author) {
    url = url ? url : await uploadFile(img)
    let res = await fetch('https://api.xteam.xyz/sticker/wm?' + new URLSearchParams(Object.entries({
      url,
      packname,
      author
    })))
    return await res.buffer()
}

module.exports = {
  /**
   * Image/Video to Sticker
   * @param {Buffer} img Image/Video Buffer
   * @param {String} url Image/Video URL
   * @param {...String} 
   */
  async sticker(img, url, ...args) {
    let lastError
    for (let func of [sticker3, sticker2, sticker1]) {
      try {
        let stiker = await func(img, url, ...args)
        if (stiker.includes('RIFF')) return stiker
        throw stiker.toString()
      } catch (err) {
        lastError = err
      }
    }
    throw lastError
  },
  sticker1,
  sticker2,
  sticker3
}
