let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return
  m.reply('Executing...')
  let { stdout, stderr } = await exec(command.trimStart()  + ' ' + text.trimEnd())
  if (stdout.trim()) m.reply(stdout)
  if (stderr.trim()) m.reply(stderr)
}
handler.customPrefix = /^[$] /
handler.command = new RegExp
handler.rowner = true
module.exports = handler
