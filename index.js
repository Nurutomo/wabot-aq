let { WAConnection: _WAConnection } = require('@adiwajshing/baileys')
let { generate } = require('qrcode-terminal')
let simple = require('./lib/simple')
let yargs = require('yargs/yargs')
let syntaxerror = require('syntax-error')
let fs = require('fs')
let path = require('path')
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
  if (m.isGroup) return
  console.log(m)
	let usedPrefix
	if ((usedPrefix = (prefix.exec(m.text) || '')[0])) {
		let args = m.text.replace(usedPrefix, '').split` `.filter(v=>v)
		let command = args.shift().toLowerCase()
    console.log({ usedPrefix, command, args })
		for (let name in global.plugins) {
			let plugin = global.plugins[name]
			if (plugin.group && m.isGroup) continue
			if (plugin.private && !m.isGroup) continue
			let isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) :
      plugin.command instanceof Array ? plugin.command.includes(command) :
      plugin.command instanceof String ? plugin.command == command : false
      conn.logger.info(isAccept)
			if (!isAccept) continue
      
      plugin(m, { usedPrefix, args, command })
			break
		}
	} 
})

!opts['test'] && conn.connect()
opts['test'] && process.stdin.on('data', chunk => conn.emit('message-new', { text: chunk.toString() }))
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = Object.fromEntries(
  fs.readdirSync(path.join(__dirname, 'plugins'))
    .filter(pluginFilter)
    .map(filename => [filename, require('./plugins/' + filename)])
)
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
    let err = syntaxerror(dir)
    if (err) conn.logger.error(`syntax error while loading '${dir}'\n${err}`)
    else global.plugins[filename] = require(dir)
  }
})
