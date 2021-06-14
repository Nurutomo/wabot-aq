module.exports = Object.assign(m => m.reply(`
*LIST HASH*
\`\`\`
${Object.entries(global.DATABASE.data.sticker).map(([key, value], index) => `${index + 1}. ${key}: ${value.text}`).join('\n')}
\`\`\`
`.trim(), null, {
    contextInfo: {
        mentionedJid: Object.values(global.DATABASE.data.sticker).map(x => x.mentionedJid).reduce((a,b) => [...a, ...b], [])
    }
}), {
    help: ['cmd'].map(v => 'list' + v + ' <text>'),
    tags: ['database'],
    command: ['listcmd']
})
