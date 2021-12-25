let handler = async (m, { conn, groupMetadata }) => {
    let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    if (!mention) throw `Tag/mention orangnya!`
    let warn = global.db.data.users[mention].warn
    if (warn < 2) {
        global.db.data.users[mention].warn += 1
        m.reply(`⚠️ *WARNING +1*`)
        m.reply('Kamu mendapatkan warn dari admin, total warn kamu sekarang *' + (warn + 1) + '* warn, Jika kamu mendapat warn *3 kali*, kamu akan dikeluarkan dari grup', mention)
    } else if (warn == 2) {
        global.db.data.users[mention].warn = 0
        m.reply('Selamat tinggal')
        await time(5000)
        await conn.groupRemove(m.chat, [mention])
        m.reply(`Kamu dikeluarkan dari group ${groupMetadata.subject} karena telah mendapat 3 kali warn`, mention)
    }
}
handler.help = ['warn [@user]']
handler.tags = ['group']
handler.command = /^warn$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler

const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}