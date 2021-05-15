let fetch = require("node-fetch")
let handler = async (m, { conn }) => {
fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
.then(res => res.text())
.then(body => {
let json = body.split('\n')
let cita = json[Math.floor(Math.random() * json.length)]
conn.sendFile(m.chat, cita, 'cita.mp3', null, m, true, {
  type: 'audioMessage', // paksa tanpa convert di ffmpeg
  ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
})}
handler.help = [''].map(v => v + ' <>')
handler.tags = ['']
handler.customPrefix = /^cita cita|citacita|cita$/i
handler.command = new RegExp
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 20

module.exports = handler
