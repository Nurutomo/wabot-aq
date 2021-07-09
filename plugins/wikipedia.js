let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let res = await fetch(global.API('zeks', '/api/wiki', { q: text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.result.result) throw 'Error!'
  if (json.result.status) m.reply(`${json.result.result}\n\n@Fatur`)
  else throw json
}
handler.help = ['wikipedia'].map(v => v + ' <apa>')
handler.tags = ['internet']
handler.command = /^(wiki|wikipedia)$/i
//belajar ngocok
module.exports = handler
