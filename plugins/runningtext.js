let handler = async (m, { conn, text }) => {
  let q
  try { q = m.quoted.download() }
  catch (e) { q = m.download() }
  m.reply('_Sedang membuat..._\n*Mohon tunggu sekitar 1 menit*')
  running(await q).then(vid => conn.sendFile(m.chat, vid, 'run.mp4', '*© Nurutomo*\nMade with FFmpeg', m))
}
handler.help = ['run']
handler.tags = ['tools']
handler.command = /^run$/i
handler.limit = true

module.exports = handler

let { spawn } = require('child_process')
let fs = require('fs')
let path = require('path')
let tmp = path.join(__dirname, '../tmp/')
function running(img, duration = 10, fps = 60) {
  return new Promise((resolve, reject) => {
    let layers = [
      `color=s=512x512:d=${duration}:r=${fps}[bg]`,
      '[0:v]scale=-2:512[img]',
      `[bg][img]overlay=x='(w+h)*((n/${fps})*-1/${duration})+h'`
    ]

    let n = + new Date + 'run.jpg'
    let i = path.join(tmp, n)
    fs.writeFileSync(i, img)
    console.log(img)
    let o = path.join(tmp, n + '.mp4')
    let args = [
      '-y',
      '-i', i,
      '-t', duration.toString(),
      '-filter_complex', layers.join(';'),
      '-pix_fmt', 'yuv420p',
      '-crf', '18',
      o
    ]
    console.log('ffmpeg', ...args)
    spawn('ffmpeg', args, { stdio: 'inherit' })
    .on('error', reject)
    .on('close', () => {
      try {
        fs.unlinkSync(i)
        resolve(fs.readFileSync(o))
        fs.unlinkSync(o)
      } catch (e) {
        reject(e)
      }
    })
    //.stderr.on('data', a => console.log(a+''))
  })
}

