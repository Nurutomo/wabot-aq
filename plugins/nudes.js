const { MessageType } = require('@adiwajshing/baileys')

const fetch = require('node-fetch')

let handler = async (m, { conn }) => {

    try {

        let res = await fetch('https://meme-api.herokuapp.com/gimme/nudes')

  resp = await res.json() 

   conn.sendMessage(m.chat, resp,MessageType.image, {

            quoted: m, caption: `${resp.title}\n*©DarkBot*`

        })

    } catch (e) {

        console.log(e)

        throw '_*Owner has not paid this feature bill*_'

    }

}

handler.help = ['nude','nudes']

handler.tags = ['premium']

handler.command = /^(nude|nudes)$/i

handler.premium = true

handler.limit = true

module.exports = handler

