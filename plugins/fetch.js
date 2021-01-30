let fetch = require('node-fetch')
let util = require('util')
let handler = async (m, { text }) => {
  let res = await fetch(text)
  let txt = await res.text()
  try {
    txt = util.format(JSON.parse(txt))
  } catch (e) {
    txt = txt
  } finally {
    m.reply(txt.slice(0, 65536))
  }
}
handler.help = ['fetch', 'get'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^(fetch|get)$/i

module.exports = handler

