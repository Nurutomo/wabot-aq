let handler = async (m, { conn }) => {
  let old = new Date
  await m.reply('_Testing speed..._')
  m.reply((new Date - old) + 'ms')
}
handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']

handler.command = /^(ping|speed)$/i
module.exports = handler
