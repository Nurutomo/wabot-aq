


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
