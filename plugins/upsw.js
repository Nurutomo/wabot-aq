const colors = [
    0xff26c4dc, 0xff792138,
    0xff8b6990, 0xfff0b330,
    0xffae8774, 0xff5696ff,
    0xffff7b6b, 0xff57c9ff,
    0xff243640, 0xffb6b327,
    0xffc69fcc, 0xff54c265,
    0xff6e257e, 0xffc1a03f,
    0xff90a841, 0xff7acba5,
    0xff8294ca, 0xffa62c71,
    0xffff8a8c, 0xff7e90a3,
    0xff74676a
]

let handler = async (m, { conn, text }) => {
    let _m = Promise.resolve({ key: { id: '' } })
    if (!m.quoted && !text) throw 'reply pesan atau sebagai argumen'
    if (m.quoted && m.quoted.mtype !== 'conversation' && !text) _m = m.quoted.forward('status@broadcast')
    if (m.quoted && m.quoted.mtype === 'conversation' && !text) _m = conn.sendMessage('status@broadcast', {
        text: m.quoted.text,
        textArgb: 0xffffffff,
        backgroundArgb: pickRandom(colors)
    }, 'extendedTextMessage')
    if (!m.quoted && text) _m = conn.sendMessage('status@broadcast', {
        text,
        textArgb: 0xffffffff,
        backgroundArgb: pickRandom(colors)
    }, 'extendedTextMessage')
    if (m.quoted && text) _m = conn.forwardMessage('status@broadcast', await m.quoted.cMod('status@broadcast', text))
    m.reply((await _m).key.id)
}
handler.help = ['upsw [text] (Reply Media)', 'upsw <text>']
handler.tags = ['owner']

handler.command = /^upsw$/i

handler.owner = true

module.exports = handler

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}