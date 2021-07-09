async function handler(m, { command, text }) {
    command = command.toLowerCase()
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw `Tag Yang Mau Di *${command}*!`
    switch (command) {
        case 'block': {
           await conn.blockUser (`${who.split`@`[0]}` + "@c.us", "add")
        }
        break
        case 'unblock': {
           await conn.blockUser (`${who.split`@`[0]}` + "@c.us", "remove")
        }
        break
        }
     m.reply(`Berhasil ${command == "block" ? `Menambahkan Ke` : `Menghapus Dari`} Blocklist`)
}

handler.help = ['block', 'unblock'].map(v => v + ' @user')
handler.tags = 'owner'

handler.command = /^(un)?block$/i

module.exports = handler
