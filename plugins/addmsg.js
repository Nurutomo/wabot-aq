let { WAMessageProto } = require('@adiwajshing/baileys')

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = WAMessageProto.WebMessageInfo
    let which = command.replace(/\+|add/i, '')
    if (!m.quoted) throw 'Balas pesan!'
    if (!text) return conn.sendButton(m.chat, `Uhm.. teksnya mana?\n\nContoh:\n${usedPrefix + command} tes`, '© wabot-aq', 'Daftar Pesan', `${usedPrefix}list${which}`, m)
    let msgs = db.data.msgs
    if (text in msgs) return conn.sendButton(m.chat, `'${text}' telah terdaftar, gunakan nama lain!`, '© wabot-aq', 'Daftar Pesan', `${usedPrefix}list${which}`, m)
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    if (db.data.chats[m.chat].getmsg) return m.reply(`Berhasil menambahkan pesan dengan nama '${text}'
    
Akses dengan mengetik '${text}'`)
    else return conn.sendButton(m.chat, `Berhasil menambahkan pesan dengan nama '${text}'

Akses dengan ${usedPrefix}get${which} ${text}

Jika Getmsg diaktifkan maka tidak perlu lagi mengetik *${usedPrefix}get${which}*`, '© wabot-aq', 'Aktifkan', '.1 getmsg', m)
}
handler.help = ['vn', 'msg', 'video', 'gif', 'audio', 'img', 'sticker'].map(v => 'add' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^(\+|add)(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler