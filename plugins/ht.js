let handler = async (m, { conn, text }) => {
  conn.hartatahta = conn.hartatahta ? conn.hartatahta : {}
  if (m.chat in conn.hartatahta) throw 'Masih ada yang sedang membuat\nTeks Harta Tahta\ndi chat ini... tunggu sampai selesai'
  else conn.hartatahta[m.chat] = true
  m.reply('_Sedang membuat..._\n*Mohon tunggu sekitar 1 menit*')
  try {
    let img = await ht(text ? text : ':v')
    conn.sendFile(m.chat, img, 'Harta Tahta.png', '*© Nurutomo*\nMade with FFmpeg', m)
  } finally {
    delete conn.hartatahta[m.chat]
  }
}
handler.help = ['tahta <teks>']
handler.tags = ['tools']
handler.command = /^((harta)?tahta)$/i
handler.limit = true

module.exports = handler

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
    let w = 1024
    let h = w
    let s = w + 'x' + h
    let xF = `(${noise('X', 2, w, 1)}+${noise('Y', 1, h, 1)})/2+128`
    let yF = `((${pickRandom(['', '-'])}${45 * w / 2048}*${pickRandom(['sin', 'cos'])}(X/${w}*4*PI))+${noise('X', 5, w, 0.8)}+${noise('Y', 2, h, 1)})/1.7+128`
    let fsize = 320 / 2048 * w
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
      '[im][wa]blend=all_mode=multiply:all_opacity=1'
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
      try {
        resolve(fs.readFileSync(o))
        fs.unlinkSync(o)
      } catch (e) {
        reject(e)
      }
    })
    //.stderr.on('data', a => console.log(a+''))
  })
}

function noise(_var, depth = 4, s = 1024, freq) {
  let forms = []
  for (let i = 0; i < depth; i++) forms.push(
    formula(
      _var,
      freq * rand(40, 80) * (s / 2048)/ s * ((i + 1) / 5),
      rand(-Math.PI, Math.PI),
      (i + 1) / depth * 8,
      0
    )
  )
  return forms.join('+')
}

function formula(_var, freq, offset, amp, add) {
  return `(${add.toFixed(3)}+${amp.toFixed(4)}*sin(${offset.toFixed(6)}+2*PI*${_var}*${freq.toFixed(6)}))`
}

function textArgs(text, background, color, size, fontfile, x = '200' , y = '200', w = 1024, h = 1024) {
  return `color=${background}:s=${w}x${h},drawtext=text='${text.replace(/[\\]/g, '\\$&')}':fontfile='${fontfile.replace(/[\\]/g, '\\$&')}':x=${x}:y=${y}:fontsize=${size}:fontcolor=${color}`
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function rand(min, max, q = 0.001) {
  return Math.floor((Math.random() * (max - min)) / q) * q
}

