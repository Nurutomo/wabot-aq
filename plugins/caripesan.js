let handler = async (m, { conn, text }) => {
    if (!text) throw 'masukan pesan yg mo dicari!'
    let split = text.split`|`
    let result = await conn.searchMessages(split[0], m.chat, split[1], 1)
    if (result.messages.length > 0) {
        let total = result.messages.length
        let sp = total < Number(split[1]) ? `Hanya ditemukan ${total} pesan ngab` : `Ditemukan ${total} pesan`
        m.reply(sp)

        result.messages.map( async ({ key }) => {
            let { remoteJid: _remoteJid, id: _ids } = key
            let _message = await conn.loadMessage(_remoteJid, _ids)
            conn.reply(m.chat, 'Nih pesannya', _message)
        })
    }
}

handler.help = ['caripesan <pesan>|<jumlah>']
handler.tags = ['tools']

handler.command = /^caripesan/i

module.exports = handler
