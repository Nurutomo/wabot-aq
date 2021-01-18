let handler = async (m, { conn, text }) => {
  m.reply('_Sedang membuat..._\n*Mohon tunggu sekitar 1 menit*')
  let img = await ht(text ? text : ':v')
  conn.sendFile(m.chat, img, 'Harta Tahta.png', '*© Nurutomo*\nMade with FFmpeg', m)
}
handler.command = ['tahta <teks>']
handler.tags = ['tools']
handler.command = /^((harta)?tahta)$/i
handler.limit = true

module.exports = ht

let { spawn } = require('child_process')
let fs = require('fs')
let path = require('path')
let src = path.join(__dirname, '../src/')
let tmp = path.join(__dirname, '../tmp/')
let _font = path.join(src, 'font')
let aesthetic = path.join(src, 'Aesthetic')
function ht(text = '') {
  return new Promise((resolve, reject) => {
    let img = path.join(aesthetic, pickRandom(fs.readdirSync(aesthetic)))
    let font = path.join(_font, 'Roboto-Black.ttf')
    let w = 2048
    let h = 2048
    let s = w + 'x' + h
    let xF = noise('X', 5, w)
    let yF = noise('Y', 5, h)
    let fsize = 350
    let lh = 1.5
    let format = ',format=rgb24'
    let layers = [
      `[v:0]scale=${s}${format}[im]`,
      textArgs('HARTA', 'black', 'white', fsize, font, '(w-text_w)/2', `(h-text_h)/2-(text_h*${lh})`, w, h) + format + '[top]',
      textArgs('TAHTA', 'black', 'white', fsize, font, '(w-text_w)/2', `(h-text_h)/2`, w, h) + format + '[mid]',
      textArgs(text, 'black', 'white', fsize, font, '(w-text_w)/2', `(h-text_h)/2+(text_h*${lh})`, w, h) + format + '[bot]',
      '[top][mid]blend=all_mode=addition[con]',
      '[con][bot]blend=all_mode=addition[txt]',
      `nullsrc=s=${s},geq='r=${xF}:g=${xF}:b=${xF}'[dx]`,
      `nullsrc=s=${s},geq='r=${yF}:g=${yF}:b=${yF}'[dy]`,
      '[txt][dx][dy]displace[wa]',
      '[im][wa]blend=all_mode=multiply:all_opacity=1,scale=w=iw/2:h=ih/2'
    ]

    let o = 1 * new Date + '_harta_tahta.png'
    o = path.join(tmp, o)
    let args = [
      '-y',
      '-i', img,
      '-filter_complex', layers.join(';'),
      '-frames:v', '1',
      o
    ]
    console.log(layers)
    console.log('ffmpeg', ...args)
    spawn('ffmpeg', args)
    .on('error', reject)
    .on('close', () => {
      resolve(fs.readFileSync(o))
      fs.unlinkSync(o)
    })
    //.stderr.on('data', a => console.log(a+''))
  })
}

function noise(_var, depth = 4, s = 1024) {
  let forms = []
  for (let i = 0; i < depth; i++) forms.push(
    formula(
      _var,
      rand(0.1, 4) / s * ((i + 1) / 10),
      rand(-Math.PI, Math.PI),
      rand(3, 12) / ((i + 1) / 2),
      128
    )
  )
  return forms.join('+')
}

function formula(_var, freq, offset, amp, add) {
  return `(${add}+${amp}*sin(${offset}+2*PI*${_var}*${freq}))`
}

function textArgs(text, background, color, size, fontfile, x = '200' , y = '200', w = 1024, h = 1024) {
  return `color=${background}:s=${w}x${h},drawtext=text='${text}':fontfile='${fontfile}':x=${x}:y=${y}:fontsize=${size}:fontcolor=${color}`
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function rand(min, max, q = 0.001) {
  return Math.floor((Math.random() * (max - min)) / q) * q
}

