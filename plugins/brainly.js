const brainly = require('brainly-scraper-v2')
let handler = async function (m, { text }) {
  if (!text) throw 'Soalnya?'
  let res = await brainly(text)
  let answer = res.data.map((v, i) => `
_*PERTANYAAN KE ${i + 1}*_
${v.pertanyaan}${v.jawaban.map((v,i) => `
*JAWABAN KE ${i + 1}*
${v.text}`).join``}`).join(`

•------------•

`)
  m.reply(answer)
}
handler.help = ['brainly <soal>']
handler.tags = ['internet']

handler.command = /^brainly$/i

module.exports = handler
