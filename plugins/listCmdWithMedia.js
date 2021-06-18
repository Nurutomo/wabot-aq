module.exports = Object.assign(m => global.DATABASE.data.sticker ? m.reply(`
*LIST HASH*
Info: *bold* hash is Locked

\`\`\`
${Object.entries(global.DATABASE.data.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}
\`\`\`
`.trim(), null, {
    contextInfo: {
        mentionedJid: Object.values(global.DATABASE.data.sticker).map(x => x.mentionedJid).reduce((a,b) => [...a, ...b], [])
    }
}) : m.reply('Nothing 🤷🏻‍♂️'), {
    help: ['cmd'].map(v => 'list' + v + ' <text>'),
    tags: ['database'],
    command: ['listcmd']
})
