let handler = async (m, { conn, args, groupMetadata }) => {
    if (args.length > 0) {
        const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : false
        let warn = global.db.data.users[mention].warn
        if (warn < 2) {
            global.db.data.users[mention].warn += 1
            conn.reply(m.chat, `⚠️ *WARNING +1*`, m)
            m.reply('Kamu mendapatkan warn dari admin, total warn kamu sekarang *' + (warn + 1) + '* warn, Jika kamu mendapat warn *3 kali*, kamu akan dikeluarkan dari grup', mention)
        } else if (warn == 2) {
            global.db.data.users[mention].warn = 0
            m.reply('Selamat tinggal')
            await time(5000)
            await conn.groupRemove(m.chat, [mention])
            m.reply(`Kamu dikeluarkan dari group ${groupMetadata.subject} karena telah mendapat 3 kali warn`, mention)

        }
    } else conn.reply(m.chat, 'Tag target', m)
}
handler.help = ['Warn @user']
handler.tags = ['group']
handler.command = /^warn$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = false
handler.admin = true
handler.botAdmin = true

module.exports = handler