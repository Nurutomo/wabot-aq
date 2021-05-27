let handler = async m => m.reply(`
╭─「 Donation 」
│ • Gpay, phonepe, [7829302695]
│ • amazon, airtel, [7829302695]
╰────

╭─「 Donation 」
│ • upi [7829302695@ybl]
│ • https://paypal.me/nknaru
╰────
`.trim()) // Add it yourself if you want
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
