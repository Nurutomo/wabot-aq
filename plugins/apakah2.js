let handler = async (m, { command, text }) => {
  m.reply(`
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${pickRandom(['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'])}
`.trim())
}
handler.help = ['apakah <pertanyaan>']
handler.tags = ['kerang']
handler.command = /^apakah$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}