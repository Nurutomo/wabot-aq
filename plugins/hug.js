/*let Mimetype = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async(m, { conn }) => {

    if(m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
    if(!m.mentionedJid.length) m.mentionedJid.push(m.sender)
  let res = await fetch('https://api.waifu.pics/sfw/hug')
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.url) throw 'Error!'

  conn.sendFile(m.chat,json.url,'h.gif',`@${m.sender.split('@')[0]} hugged ${m.mentionedJid.map((user)=>(user === m.sender)? 'themselves ': `@${user.split('@')[0]}`).join(', ')}`,m,false,
  { mimetype: Mimetype.gif, contextInfo :{mentionedJid : [  ...m.mentionedJid,m.sender ] }})
  

}
handler.help = ['neko']
handler.tags = ['internet']
handler.command = /^hug$/i

module.exports = handler*/


let fetch = require("node-fetch")

const { sticker } = require('../lib/sticker')

const { MessageType } = require('@adiwajshing/baileys')

let handler = async(m, { conn }) => {

  let res = await fetch(global.API('https://api.waifu.pics', '/sfw/hug'))

  let json = await res.json()

  let stiker = await sticker(null, json.url, global.packname, global.author)

  if (stiker) return conn.sendMessage(m.chat, stiker, MessageType.sticker, {

    quoted: m

  })

  throw stiker.toString()

}

handler.help = ['neko']

handler.tags = ['internet']

handler.command = /^hug$/i

module.exports = handler
