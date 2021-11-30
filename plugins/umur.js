let axios = require("axios")

let handler = async(m, { conn, text, usedPrefix, command }) => {
  let errF = `Format salah!\nExample : ${usedPrefix + command} 2008-11-08`
  if(!text || text.length != 10 || !text.includes("-")) return m.reply(errF)
  let { data } = await axios(`https://restu-restapi.herokuapp.com/hitungumur?tbt=${text}`)
  let { umur, ultah } = data.result

  m.reply(`*Umur :* ${umur}\n*Ultah :* ${ultah}`)
}

handler.help = ["ultah", "umur", "hitungumur"].map(v => v + " tahun-bulan-tanggal")
handler.tags = ["tools"]

handler.command = /^(ultah|umur|hitungumur)/i

module.exports = handler
