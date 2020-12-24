let { WAConnection: _WAConnection, WA_MESSAGE_STUB_TYPES } = require('@adiwajshing/baileys')
let { generate } = require('qrcode-terminal')
let simple = require('./lib/simple')
let yargs = require('yargs/yargs')
let syntaxerror = require('syntax-error')
let fs = require('fs')
let path = require('path')
let util = require('util')
let WAConnection = simple.WAConnection(_WAConnection)
global.conn = new WAConnection()

let opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
let prefix = new RegExp('^[' + (opts['prefix'] || '!#$%.') + ']')

let authFile = `${opts._[0] || 'session'}.data.json`
fs.existsSync(authFile) && conn.loadAuthInfo(authFile)
opts['big-qr'] && conn.on('qr', qr => generate(qr, { small: false }))
conn.on('credentials-updated', () => fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo())))

conn.on('message-new', async m => {
	simple.smsg(conn, m)
  printMsg(m)
  if (!m.text) return
	let usedPrefix
	for (let name in global.plugins) {
	  let plugin = global.plugins[name]
    if (!plugin) continue
    let _prefix = plugin.customPrefix ? plugin.customPrefix : prefix
	  if ((usedPrefix = (_prefix.exec(m.text) || '')[0])) {
		  let args = m.text.replace(usedPrefix, '').split` `.filter(v=>v)
		  let command = (args.shift() || '').toLowerCase()
      let isOwner = m.fromMe
      let isMods = isOwner || global.mods.includes(m.sender)
      let isPrems = isMods || global.prems.includes(m.sender)
      let fail = plugin.fail || global.dfail
      if (plugin.owner && !isOwner) {
        fail('owner', m)
        continue
      }
      if (plugin.mods && !isMods) {
        fail('mods', m)
        continue
      }
      if (plugin.premium && !isPrems) {
        fail('premium', m)
        continue
      }
			if (plugin.group && !m.isGroup) {
        fail('group', m)
        continue
      }
			if (plugin.private && m.isGroup) {
        fail('private', m)
        continue
      }
			let isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) :
      plugin.command instanceof Array ? plugin.command.includes(command) :
      plugin.command instanceof String ? plugin.command == command : false
			if (!isAccept) continue
      
      plugin(m, { usedPrefix, args, command }).catch(e => conn.reply(m.chat, util.format(e), m))
			break
		}
	} 
})

global.mods = []
global.prems = []

function printMsg(m) {
  let sender = conn.getName(m.sender) || m.messageStubParameters.map(v => v.split('@')[0] + (conn.getName(v) ? ' ~' + conn.getName(v) : '')).join(' & ')
  let chat = conn.getName(m.chat)
  let ansi = '\x1b]'
  console.log(
    '(%s) %s\n[%s] to [%s] <%s>%s\n',
    (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date()).toTimeString(),
    m.messageStubType ? WA_MESSAGE_STUB_TYPES[m.messageStubType] : '',
    m.messageStubParameters.lengths ? sender : m.sender.split('@')[0] + (sender ? ' ~' + sender : ''),
    m.chat + (chat ? ' ~' + chat : ''),
    m.mtype ? m.mtype.replace(/message$/i, '') : '',
    typeof m.text == 'string' ? '\n' + m.text
      // .replace(/(\s|^)((https?:\/\/)?(\S+?\.)?\S+?\.(com|co|id|me|co\.id|xyz|org)(\/\S+?))?(\s|$)/g, `$1${ansi}34m$2${ansi}39m$7`)
      // .replace(/(^|\s)_(.+)?_($|\s)/g, `$1${ansi}3m$2${ansi}23m$3`)
      // .replace(/(^|\s)\*(.+)?\*($|\s)/g, `$1${ansi}1m$2${ansi}22m$3`)
      // .replace(/(^|\s)~(.+)?~($|\s)/g, `$1${ansi}9m$2${ansi}29m$3`)
      : ''
  )
}

global.dfail = (type, m) => {
  let msg = {
    owner: 'Perintah ini hanya dapat digunakan oleh Owner Nomor!',
    mods: 'Perintah ini hanya dapat digunakan oleh Moderator!',
    premium: 'Perintah ini hanya untuk member Premium!',
    group: 'Perintah ini hanya dapat digunakan di Grup!',
    private: 'Perintah ini hanya dapat digunakan di Chat Pribadi!',
    admin: 'Anda bukan admin grup!',
    botAdmin: 'Jadikan bot sebagai admin untuk menggunakan perintah ini!'
  }[type]
  msg && conn.reply(m.chat, msg, m)
}

!opts['test'] && conn.connect()
opts['test'] && process.stdin.on('data', chunk => conn.emit('message-new', { text: chunk.toString() }))
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = Object.fromEntries(
  fs.readdirSync(path.join(__dirname, 'plugins'))
    .filter(pluginFilter)
    .map(filename => [filename, {}])
)
for (let filename in global.plugins) {
  try {
    global.plugins[filename] = require('./plugins/' + filename)
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(global.plugins)
fs.watch(path.join(__dirname, 'plugins'), (event, filename) => {
  if (pluginFilter(filename)) {
    let dir = './plugins/' + filename
    if (delete require.cache[require.resolve(dir)]) {
      if (fs.existsSync(require.resolve(dir))) conn.logger.info(`re - require plugin '${dir}'`)
      else {
        conn.logger.warn(`deleted plugin '${dir}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${dir}'`)
    let err = syntaxerror(fs.readFileSync(dir))
    if (err) conn.logger.error(`syntax error while loading '${dir}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    }
  }
})
