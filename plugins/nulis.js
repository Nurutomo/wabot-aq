let util = require('util')
let path = require('path')
let { spawn } = require('child_process')

let fontPath = '../src/font/Zahraaa.ttf'
let handler  = async (m, { conn, args }) => {
  let inputPath ='../src/kertas/magernulis1.jpg'
  let outputPath = '../tmp/hasil.jpg'
  let tgl = new Date().toLocaleDateString()
  let hari = ':v'
  let teks = args.join` `
  conn.reply(m.chat, util.format({fontPath, inputPath, outputPath, tgl, hari, teks}), m)
  spawn('convert', [
    inputPath,
    '-font',
    fontPath,
    '-size',
    '700x960',
    '-pointsize',
    '100',
    '-interline-spacing',
    '1',
    '-annotate',
    '+4100+460',
    hari,
    '-font',
    fontPath,
    '-size',
    '700x960',
    '-pointsize',
    '100',
    '-interline-spacing',
    '1',
    '-annotate',
    '+4100+640',
    tgl,
    '-font',
    fontPath,
    '-size',
    '6000x8000',
    '-pointsize',
    '130',
    '-interline-spacing',
    '1',
    '-annotate',
    '+1010+1010',
    teks,
    outputPath
  ])
  .on('error', e => conn.reply(m.chat, util.format(e), m))
  .on('exit', () => {
    conn.sendFile(m.chat, outputPath, 'nulis.jpg', 'p')
  })
  .stdout.on('data', process.stdout.write)
}
handler.command = /^nulis$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

