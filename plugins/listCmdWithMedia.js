module.exports = Object.assign(m => m.reply(`
*LIST HASH*
\`\`\`
${Object.entries(global.DATABASE.data.sticker).map(([key, value], index) => `${index + 1}. ${key}: ${value}`).join('\n')}
\`\`\`
`.trim()), {
    help: ['cmd'].map(v => 'list' + v + ' <text>'),
    tags: ['database'],
    command: ['listcmd']
})
