let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...url nya mana?'
  let res = await fetch(global.API('xteam', '/dl/tiktok', {
    url: args[0]
  }, 'APIKEY'))
  if (res.status !== 200) throw await res.text()
  let json = await res.json()
  if (!json.status) throw json
  try {
    await conn.sendFile(m.chat, json.server_1, 'tiktok.mp4', '', m)
  } catch (e) {
    m.reply('Server 1 Failed, Retrying with Server 2')
    await conn.sendFile(m.chat, json.server_2, 'tiktok.mp4', '', m)
  }
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tiktok(dl)?)$/i

module.exports = handler
