let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, Object.entries(await stylizeText(text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text)).map(([name, value]) => `*${name}*\n${value}`).join`\n\n`, m)
}
handler.help = ['style'].map(v => v + ' <text>')
handler.tags = ['tools']
handler.command = /^(style)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

async function stylizeText(text) {
    let res = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(text))
    let html = await res.text()
    let dom = new JSDOM(html)
    let table = dom.window.document.querySelector('table').children[0].children
    let obj = {}
    for (let tr of table) {
      let name = tr.querySelector('.aname').innerHTML
      let content = tr.children[1].textContent.replace(/^\n/, '').replace(/\n$/, '')
      obj[name + (obj[name] ? ' Reversed' : '')] = content
    }
    return obj
}
