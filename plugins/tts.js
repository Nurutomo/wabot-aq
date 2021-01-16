let gtts = require('node-gtts')
let fs = require('fs')
let path = require('path')
let { spawn } = require('child_process')
let handler = async (m, { conn, args }) => {
  if (args.length < 2) return m.reply('Tidak ada teks nya')
  conn.sendFile(m.chat, await tts(args[0], args.slice(1).join(' ')).catch(err => m.reply(err + '')), 'tts.opus', null, m, true)
}
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^g?tts$/i
module.exports = handler

function tts(lang, text) {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang)
      let filePath = path.join(__dirname, '../tmp', (1 * new Date) + '.wav')
      let mp3 = filePath.replace(/wav$/, 'opus')
      tts.save(filePath, text, () => {
        spawn('ffmpeg', [
          '-i', path.resolve(filePath),
          '-vn',
          '-c:a', 'libopus',
          '-b:a', '128k',
          '-vbr', 'on',
          '-compression_level', '10',
          path.resolve(mp3)
        ])
        .on('exit', (err) => {
          fs.unlinkSync(filePath)
          if (err) reject(err)
          resolve(fs.readFileSync(mp3))
          fs.unlinkSync(mp3)
        })
      })
    } catch (e) { reject(e) }
  })
}
