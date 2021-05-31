let handler = async m => m.reply(`
╭─「 Donasi • Pulsa 」
│ • Axis [083181106073]
│ • Telkomsel [083181106073]
╰────

╭─「 Donasi • Non Pulsa 」
│ • Gopay, OVO, Dana [083181106073]
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
