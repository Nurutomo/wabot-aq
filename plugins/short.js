/* Codded By TOXIC-DEVIL
# wabot-aq
# nurutomo/wabot-aq
LICENSED UNDER GNU General Public */

let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let url = await fetch(global.API('xteam', '/shorturlat', { url: text }, 'APIKEY')) // Powered By Xteam
  let res = await fetch(`${url}`) 
  let json = await res.json()
  if (json.status) m.reply(`💬 tautan asli : ${text}\n\n🔄 tautan singkat : ${json.result}`)
  else throw json
}
handler.help = ['short'].map(v => v + ' <teks>')
handler.tags = ['tools']
handler.command = /^short$/i

module.exports = handler
