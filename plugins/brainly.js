const Brainly = require('brainly-scraper-v2')
const brainly = new Brainly('id')
let handler = async function (m, { text }) {
  if (!text) throw 'Soalnya?'
  let res = await brainly.search('id', text)
  let answer = res.map(({ question, answers }, i) => `
_*PERTANYAAN KE ${i + 1}*_
${question.content}${answers.map((v, i) => `
*JAWABAN KE ${i + 1}*
${v.content}`).join``}`).join(`

•------------•

`)
  m.reply(answer)
}
handler.help = ['brainly <soal>']
handler.tags = ['internet']

handler.command = /^brainly$/i

module.exports = handler
