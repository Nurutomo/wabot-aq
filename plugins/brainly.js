const Brainly = require('brainly-scraper-v2')
const brainly = new Brainly('id')
let handler = async function (m, { text }) {
  if (!text) throw 'Soalnya?'
  let res = await brainly.search('id', text)
  let answer = res.map(({ question, answers }, i) => `
_*PERTANYAAN KE ${i + 1}*_
${formatTags(question.content)}${answers.map((v, i) => `
*JAWABAN KE ${i + 1}*${v.verification ? ' (Verified)' : ''}${v.isBest ? ' (Terpilih)' : ''}
${formatTags(v.content)}`).join``}`).join(`

•------------•

`)
  m.reply(answer)
}
handler.help = ['brainly <soal>']
handler.tags = ['internet']

handler.command = /^brainly$/i

module.exports = handler

function formatTags(str) {
  let tagRegex = /<(.+?)>((?:.|\n)*?)<\/\1>/gi
  let replacer = (_, tag, inner) => {
    let a = inner.replace(tagRegex, replacer)
    let b = ''
    switch (tag) {
      case 'p':
        a += '\n'
        break
      case 'i':
        b = '_'
      case 'strikethrough':
        b = '~'
      case 'strong':
        b = '*'
        a = a.split('\n').map(a => a ? b + a + b : a).join('\n')
        break
    }
    return a
  }
  
  return str
    .replace(/<br *?\/?>/gi, '\n')
    .replace(tagRegex, replacer)
    .trim()
}
