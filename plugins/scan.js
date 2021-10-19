// Thanks to TOXIC-DEVIL
// https://github.com/TOXIC-DEVIL

let handler = async (m, { conn, args }) => {
    if (!args || !args[0] || args.length === 0) throw 'Masukkan nomor untuk dipindai!'
    if (args[0].startsWith('0')) throw 'Gunakan code Negara!'
    let user = await conn.isOnWhatsApp(args[0])
    let exists = user && user.exists ? true : false
    if (exists) {
        let sameGroup = [], isInDatabase = false
        let chat = conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only)
        for (let gc of chat) {
            let participants = gc && gc.metadata && gc.metadata.participants ? gc.metadata.participants : []
            if (participants.some(v => v.jid === user.jid)) sameGroup.push(gc.jid)
        }
        if (user.jid in global.db.data.users) isInDatabase = true
        let str = ` 
*Nama:* ${conn.getName(user.jid)}
*Nomor:* ${splitM(user.jid)}
*Mention:* ${toM(user.jid)}
*API:* wa.me/${splitM(user.jid)}
*JID:* ${user.jid}
*Whatsapp Bussines:* ${user.isBusiness ? 'Yes' : 'No'}
*In Database:* ${isInDatabase ? 'Yes' : 'No'}
*Group Yang Sama Dengan BOT:* ${sameGroup.length} *Group*
`.trim()
        m.reply(str, m.chat, { 
            contextInfo: { 
                mentionedJid: conn.parseMention(str)
            }
        })
    } else throw 'User Tidak Ditemukan!!'
}
    
handler.help = ['scan'].map(v => v + ' [nomor]')
handler.tags = ['tools']
handler.command = /^scan$/i

module.exports = handler

function splitM(jid) {
    return jid.split('@')[0]
}

function toM(jid) {
    return '@' + splitM(jid)
}