const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toAudio(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, '../tmp', + new Date  + '.' + ext)
    let out = tmp + '.mp3'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i',tmp,
      '-vn',
      '-ac', '2',
      '-b:a','128k',
      '-ar','44100',
      '-f', 'mp3',
      out
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toPTT(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, '../tmp', + new Date + '.' + ext)
    let out = tmp + '.opus'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i',tmp,
      '-vn',
      '-c:a','libopus',
      '-b:a','128k',
      '-vbr','on',
      '-compression_level','10',
      out,
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 */
function toVideo(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, '../tmp', + new Date + '.' + ext)
    let out = tmp + '.mp4'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i', tmp,
      '-c:v','libx264',
      '-c:a','aac',
      '-ab','192k',
      '-ar','44100',
      out
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

module.exports = {
  toAudio,
  toPTT,
  toVideo
}
