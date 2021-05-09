let fetch = require("node-fetch")

let handler = async(m, { conn, text }) => {

if (!text) return conn.reply(m.chat, 'Harap masukan query!', m)

let url =`https://api.fdci.se/rep.php?gambar=${text}`;

let caption = `Search result

${text}`
//by Anshul
let su = await fetch(url)

let son = await su.json()

let rand = son[Math.floor(Math.random() * son.length)]

conn.sendFile(m.chat,rand,'',caption,m)

    .catch(

        (error) => {

            console.log(error); // Logs an error if there was one

        }

    )

}

handler.help = ['pinterest <query>']

handler.tags = ['internet']

handler.command = /^(pinterest)$/i

handler.owner = false

handler.mods = false

handler.premium = true

handler.group = false

handler.private = false

handler.register = true

handler.admin = false

handler.botAdmin = false

handler.fail = null

handler.exp = 0

handler.limit = false

module.exports = handler
