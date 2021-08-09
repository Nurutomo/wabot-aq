let handler = async (m, { conn, text }) => {
    if (!m.quoted) return conn.sendMessage(m.chat, 'where\'s message?', 'conversation')

    await conn.copyNForward(m.chat, await conn.loadMessage(m.chat, m.quoted.id), false, { readViewOnce: true })
}

handler.help = ['readviewonce']
handler.tags = ['tools']

handler.command = /^readviewonce/i

module.exports = handler
