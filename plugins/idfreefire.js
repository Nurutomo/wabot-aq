let fetch = require('node-fetch')
let handler = async (m, { args }) => {
  let res = await fetch(global.API('xteam', '/search/freefire', {id: args[0]}, 'APIKEY'))
  let json = await res.json()
  if (json.result.name) conn.reply(m.chat, json.result.name, m)
    else throw json
}
handler.help = ['epep'].map(v => v + ' <id>')
handler.tags = ['internet']
handler.command = /^(freefire|epep)$/i

module.exports = handler
