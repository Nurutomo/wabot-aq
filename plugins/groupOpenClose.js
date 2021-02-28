const { GroupSettingChange } = require('@adiwajshing/baileys')
/*
made with love, by ariffb
http://wa.me/6283128734012

by Ariffb nya boleh diganti
Astrobot - http://wa.me/6285157336614?text=hai+bot
*/
let handler = async (m, { conn, args, usedPrefix }) => {
    if (args[0] === 'open') {
        conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
        conn.fakeReply(m.chat, `*Grup berhasil dibuka!*`, '0@s.whatsapp.net', `*© Astrobot*`, m.chat)
    } else if (args[0] === 'close') {
        conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
        conn.fakeReply(m.chat, `*Grup berhasil ditutup!*`, '0@s.whatsapp.net', `*© Astrobot*`, m.chat)
    } else if (args[0] === 'buka') {
        conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
        conn.fakeReply(m.chat, `*Grup berhasil dibuka!*`, '0@s.whatsapp.net', `*© Astrobot*`, m.chat)
    } else if (args[0] === 'tutup') {
        conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
        conn.fakeReply(m.chat, `*Grup berhasil ditutup!*`, '0@s.whatsapp.net', `*© Astrobot*`, m.chat)
    } else {
        conn.fakeReply(m.chat, `*Contoh : ${usedPrefix}grup tutup*`, '0@s.whatsapp.net', `*© Astrobot*`, m)
    }
}

handler.help = ['group <open/close>']
handler.tags = ['group']
handler.command = /^(group|grup)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler
