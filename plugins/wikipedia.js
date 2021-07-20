let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let res = await fetch(global.API('zeks', '/api/wiki', { q: text }, 'apikey'))
  let json = await res.json()
  if (json.result.error) throw json.result.error
  if (json.result.status) m.reply(`${json.result.result}\n\n@Fatur`)
  else throw `Error!`
}
handler.help = ['wikipedia'].map(v => v + ' <apa>')
handler.tags = ['internet']
handler.command = /^(wiki|wikipedia)$/i
//belajar ngocok
module.exports = handler

