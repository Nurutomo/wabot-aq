let handler = async (m, { conn }) => {

    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : ''
    else who = m.chat
    if (global.prems.includes(who)) throw 'Belum premium!'
    global.prems.splice(global.prems.indexOf(who.split`@`[0]), 1)
    conn.reply(m.chat, `Hai, @${who.split('@')[0]}. Masa premium kamu sudah berakhir!`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    })
  
}
handler.help = ['delprem *@user*']
handler.tags = ['owner']

handler.command = /^(remove|hapus|-|del)prem$/i

handler.owner = true

module.exports = handler
