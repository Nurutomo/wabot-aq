let handler = async(m, { conn }) => {
conn.sendFile(m.chat, global.API('xteam', '/randomimage/hentai', {}, 'APIKEY'), '', 'sange kok sama kartun',m)
}
handler.help = ['hentai']
handler.tags = ['premium']
handler.command = /^(hentai)$/i
handler.premium = true
handler.private = true
handler.limit = true

module.exports = handler
