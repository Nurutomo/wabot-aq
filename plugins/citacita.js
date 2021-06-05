let fetch = require("node-fetch")
let handler = async (m, { conn }) => {
let res = await fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
let txt = await res.text()

let json = txt.split('\n')
let cita = arr[Math.floor(Math.random() * arr.length)]
conn.sendFile(m.chat, cita, 'cita.mp3', null, m, true, {
  type: 'audioMessage', // paksa tanpa convert di ffmpeg
  ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}


handler.customPrefix = /^cita cita|citacita|cita$/i
handler.command = new RegExp






module.exports = handler
