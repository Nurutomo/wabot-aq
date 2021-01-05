let util = require('util')
let path = require('path')
let { spawn } = require('child_process')

let fontPath = 'src/font/Zahraaa.ttf'
let handler  = async (m, { conn, args }) => {
  let inputPath ='src/kertas/magernulis1.jpg'
  let outputPath = 'tmp/hasil.jpg'
  let d = new Date
  let tgl = d.toLocaleDateString('id-Id')
  let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
  let teks = args.join` `
  // conn.reply(m.chat, util.format({fontPath, inputPath, outputPath, tgl, hari, teks}), m)
  spawn('convert', [
    inputPath,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '20',
    '-interline-spacing',
    '1',
    '-annotate',
    '+800+80',
    hari,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '18',
    '-interline-spacing',
    '1',
    '-annotate',
    '+808+105',
    tgl,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '25',
    '-interline-spacing',
    '-17',
    '-annotate',
    '+350+148',
    teks,
    outputPath
  ])
  .on('error', e => conn.reply(m.chat, util.format(e), m))
  .on('exit', () => {
    conn.sendFile(m.chat, outputPath, 'nulis.jpg', 'Hati² ketahuan:v')
  })
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

