module.exports = Object.assign(async function handler(m, { conn, text }) {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw 'Hash not found'
    let sticker = global.db.data.sticker[hash]
    if (sticker) return m.reply(`
*fileSha256:* ${hash}
*Text:* ${sticker.text}
*Time Create:* ${sticker.at}
*Locked:* ${sticker.locked ? 'Yes' : 'No'}
*Creator Name:* ${conn.getName(sticker.creator)}
*Creator Number:* ${splitM(sticker.creator)}
*Creator Jid:* ${sticker.creator}


${sticker.mentionedJid.length > 0 ? `*Cmd Mention:*

${sticker.mentionedJid.map((v, i) => `No. *${i + 1}*:\n*Mention Name:* ${conn.getName(v)}\n*Mention Number:* ${splitM(v)}\n*Mention Jid:* ${v}`).join('\n\n')}` : ''} 
`.trim())
    else m.reply('Sticker Not in the database')
}, {
    help: ['cmd'].map(v => 'info' + v + ' <text>'),
    tags: ['database'],
    command: ['infocmd']
})

/**
 * split Jid
 * @param {String} jid 
 * @returns String
 */
function splitM(jid) {
    return jid.split('@')[0]
}