let handler  = async (m, { conn, args }) => {
  dir = ["https://tinyurl.com/ygms8wvy",
"https://tinyurl.com/yhdyhnap",
"https://tinyurl.com/yfwjbou7",
"https://tinyurl.com/yh3e3ogt",
"https://tinyurl.com/yfmhpvxs",
"https://tinyurl.com/ygpxka9q"
];
  random = dir[Math.floor(Math.random() * dir.length)]
  conn.sendFile(m.chat, `${random}`, 'dadu.webp', '', m)
}
handler.help = ['dadu']
handler.tags = ['sticker', 'fun']
handler.command = /^dadu$/i

module.exports = handler
