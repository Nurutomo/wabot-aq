let handler  = async (m, { conn, args, text }) => {
     if (!text) throw 'Cari apa ?'
 if (text) m.reply('Searching.....')
let gis = require('g-i-s')
gis(text, result)

async function result(error, results) {
if (error) throw error
C = Math.floor(Math.random() * results.length)
Random = results[C]
conn.sendFile(m.chat, Random.url, 'gimage', `*── 「 GOOGLE IMAGE 」 ──*\n\n${text}\n➸ *width*: ${Random.width}\n➸ *height*: ${Random.height}`, m, false, {
  thumbnail: Buffer.alloc(0)
})
}
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image)$/i

handler.limit = true

handler.fail = null

module.exports = handler