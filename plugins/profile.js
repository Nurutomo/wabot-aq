let handler = async (m, { conn }) => {
  let pp
  try {
    pp = await conn.getProfilePicture(m.sender)
  } catch (e) {

  } finally {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let str = `
Name: ${name.vnmae || name.notify || name.name || ('+' + name.jid.split`@`[0])} (@${m.sender.replace(/@.+/, '')})
Number: +${m.sender.split`@`[0]}
Link: https://wa.me/${m.sender.split`@`[0]}
`.trim()
    let mentionedJid = [m.sender]
    if (pp) conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid }})
    else conn.reply(m.chat, str, m, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['profile']
handler.tags = ['tools']
handler.command = /^profile$/
module.exports = handler

