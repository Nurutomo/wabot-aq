let { WAConnection: _WAConnection, WA_MESSAGE_STUB_TYPES } = require('@adiwajshing/baileys')
let { generate } = require('qrcode-terminal')
let qrcode = require('qrcode')
let simple = require('./lib/simple')
let yargs = require('yargs/yargs')
let syntaxerror = require('syntax-error')
let chalk = require('chalk')
let fs = require('fs')
let path = require('path')
let util = require('util')
let WAConnection = simple.WAConnection(_WAConnection)
global.timestamp = {
  start: new Date
}
const PORT = process.env.PORT || 3000
let opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
global.opts = Object.freeze({...opts})
global.prefix = new RegExp('^[' + (opts['prefix'] || '\\/i!#$%\\-+£¢€¥^°=¶∆×÷π√✓©®:;?&.') + ']')

global.DATABASE = new (require('./lib/database'))(opts._[0] ? opts._[0] + '_' : '' + 'database.json', null, 2)
if (!global.DATABASE.data.users) global.DATABASE.data = {
  users: {},
  groups: {},
  chats: {},
}
if (!global.DATABASE.data.groups) global.DATABASE.data.groups = {}
if (!global.DATABASE.data.chats) global.DATABASE.data.chats = {}
if (opts['server']) {
  let express = require('express')
  global.app = express()
  app.all('*', async (req, res) => {
    await global.conn.connect().catch(console.log)
    res.end(await qrcode.toBuffer(global.qr))
  })
  app.listen(PORT, () => console.log('App listened on port', PORT))
}
global.conn = new WAConnection()
let authFile = `${opts._[0] || 'session'}.data.json`
if (fs.existsSync(authFile)) conn.loadAuthInfo(authFile)
if (opts['big-qr'] || opts['server']) conn.on('qr', qr => generate(qr, { small: false }))
if (opts['server']) conn.on('qr', qr => { global.qr = qr })
conn.on('credentials-updated', () => fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo())))
let lastJSON = JSON.stringify(global.DATABASE.data)
setInterval(async () => {
  conn.logger.info('Saving database . . .')
  if (JSON.stringify(global.DATABASE.data) == lastJSON) conn.logger.info('Database is up to date')
  else {
    global.DATABASE.save()
    conn.logger.info('Done saving database!')
    lastJSON = JSON.stringify(global.DATABASE.data)
  }
}, 60 * 1000) // Save every minute
conn.handler = async function (m) {
  try {
  	simple.smsg(this, m)
    m.exp = 0
    m.limit = false
    if (!m.fromMe && opts['self']) return
    if (!m.text) return
    if (m.isBaileys) return
    try {
      if (global.DATABASE._data.users[m.sender]) {
        if (typeof global.DATABASE._data.users[m.sender].exp == 'number' &&
          !isNaN(global.DATABASE._data.users[m.sender].exp)
        ) m.exp += 1
        else global.DATABASE._data.users[m.sender].exp = 0
        if (typeof global.DATABASE._data.users[m.sender].limit != 'number' ||
          isNaN(global.DATABASE._data.users[m.sender].limit)
        ) global.DATABASE._data.users[m.sender].limit = 10
        if (typeof global.DATABASE._data.users[m.sender].lastclaim != 'number' ||
          isNaN(global.DATABASE._data.users[m.sender].lastclaim)
        ) global.DATABASE._data.users[m.sender].lastclaim = 0
      } else global.DATABASE._data.users[m.sender] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
      }
    } catch (e) {
      console.log(e, global.DATABASE.data)
    }
  	let usedPrefix
  	for (let name in global.plugins) {
  	  let plugin = global.plugins[name]
      if (!plugin) continue
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
  	  if ((usedPrefix = (_prefix.exec(m.text) || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
  		  let [command, ...args] = noPrefix.trim().split` `.filter(v=>v)
        let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
  		  command = (command || '').toLowerCase()
        let isOwner = m.fromMe
  			let isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) :
        plugin.command instanceof Array ? plugin.command.includes(command) :
        plugin.command instanceof String ? plugin.command == command : false
  			if (!isAccept) continue
        let isMods = isOwner || global.mods.includes(m.sender)
        let isPrems = isMods || global.prems.includes(m.sender)
        let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
        let participants = m.isGroup ? groupMetadata.participants : []
        let user = m.isGroup ? participants.filter(u => u.jid == m.sender)[0] : {}
        let bot = m.isGroup ? participants.filter(u => u.jid == this.user.jid)[0] : {}
        let isAdmin = user.isAdmin || user.isSuperAdmin || false
        let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false
        if (plugin.before) plugin.before({
          usedPrefix
        })
        let fail = plugin.fail || global.dfail
        if (plugin.owner && !isOwner) {
          fail('owner', m, this)
          continue
        }
        if (plugin.mods && !isMods) {
          fail('mods', m, this)
          continue
        }
        if (plugin.premium && !isPrems) {
          fail('premium', m, this)
          continue
        }
  			if (plugin.group && !m.isGroup) {
          fail('group', m, this)
          continue
        } else if (plugin.botAdmin && !isBotAdmin) {
          fail('botAdmin', m, this)
          continue
        } else if (plugin.admin && !isAdmin) {
          fail('admin', m, this)
          continue
        }
  			if (plugin.private && m.isGroup) {
          fail('private', m, this)
          continue
        }

        m.isCommand = true
        m.exp += 'exp' in plugin ? parseInt(plugin.exp) : 10
        if (!isPrems && global.DATABASE._data.users[m.sender].limit < 1 && plugin.limit) {
          this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
          continue
        }
        try {
          await plugin(m, {
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata
          })
          if (!isPrems) m.limit = m.limit || plugin.limit || false
        } catch (e) {
          console.log(e)
          this.reply(m.chat, util.format(e), m)
        } finally {
          if (m.limit == true) this.reply(m.chat, '1 Limit terpakai', m)
        }
  			break
  		}
  	}
  } finally {
    //console.log(global.DATABASE._data.users[m.sender])
    if (m && m.sender && global.DATABASE._data.users[m.sender]) {
      global.DATABASE._data.users[m.sender].exp += m.exp
      global.DATABASE._data.users[m.sender].limit -= m.limit * 1
    }
    try {
      require('./lib/print')(m, this)
    } catch (e) {
      console.log(m, e)
    }
  }
}

conn.on('message-new', conn.handler) 
conn.on('error', conn.logger.error)
global.mods = []
global.prems = []

global.dfail = (type, m, conn) => {
  let msg = {
    owner: 'Perintah ini hanya dapat digunakan oleh Owner Nomor!',
    mods: 'Perintah ini hanya dapat digunakan oleh Moderator!',
    premium: 'Perintah ini hanya untuk member Premium!',
    group: 'Perintah ini hanya dapat digunakan di grup!',
    private: 'Perintah ini hanya dapat digunakan di Chat Pribadi!',
    admin: 'Perintah ini hanya untuk admin grup!',
    botAdmin: 'Jadikan bot sebagai admin untuk menggunakan perintah ini!'
  }[type]
  msg && conn.reply(m.chat, msg, m)
}


if (opts['test']) process.stdin.on('data', chunk => conn.emit('message-new', { text: chunk.toString() }))
else conn.connect().then(() => {
  global.timestamp.connect = new Date
})
process.on('uncaughtException', console.error)
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
    if (require.resolve(dir) in require.cache) {
      delete require.cache[require.resolve(dir)]
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

process.on('exit', () => global.DATABASE.save())
