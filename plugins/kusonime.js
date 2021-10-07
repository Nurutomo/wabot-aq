let fetch = require('node-fetch')
let handler = async function (m, { text, isPrems, isOwner }) {
	let user = global.db.data.users[m.sender]
    if (!text) throw '_yg dicari apa_'
    await m.reply(global.wait)
  let res = await fetch('https://ardhixsquerpants.herokuapp.com/api/kuso?q=' + encodeURIComponent(text))
let json= await res.json()
  const ardi =  `*judul:* "${json.title}"\n\n*info:* ${json.info}\n\n*sinopsis:* ${json.sinopsis}\n\n*link download:* ${json.link_dl}`
     conn.sendFile(m.chat,json.thumb, 'image.jpg', ardi, m)
}
handler.help = ['kusonime <judul>']
handler.tags = ['internet']
handler.command = /^kusonime$/i
handler.group = false

module.exports = handler
