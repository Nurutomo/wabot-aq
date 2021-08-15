let { MessageType } = require('@adiwajshing/baileys')
let { performance } = require('perf_hooks')
let osu = require('node-os-utils')
let handler  = async (m, { conn, usedPrefix }) => {
    try {
        let NotDetect = 'Not Detect'
        let old = performance.now()
        let cpu = osu.cpu
        let cpuCore = cpu.count()
        let drive = osu.drive
        let mem = osu.mem
        let netstat = osu.netstat
        let OS = osu.os.platform()
        let cpuModel = cpu.model()
        let cpuPer
        let p1 = cpu.usage().then(cpuPercentage => {
            cpuPer = cpuPercentage
        }).catch(() => { 
            cpuPer = NotDetect
        })
        let driveTotal, driveUsed, drivePer
        let p2 = drive.info().then(info => {
            driveTotal = (info.totalGb + ' GB'),
            driveUsed = info.usedGb,
            drivePer = (info.usedPercentage + '%')
         }).catch(() => { 
            driveTotal = NotDetect,
            driveUsed = NotDetect,
            drivePer = NotDetect
        })
        let ramTotal, ramUsed
        let p3 = mem.info().then(info => {
            ramTotal = info.totalMemMb,
            ramUsed = info.usedMemMb
        }).catch(() => { 
            ramTotal = NotDetect,
            ramUsed = NotDetect
        })
        let netsIn, netsOut
        let p4 = netstat.inOut().then(info => {
            netsIn = (info.total.inputMb + ' MB'),
            netsOut = (info.total.outputMb + ' MB')
        }).catch(() => { 
            netsIn = NotDetect,
            netsOut = NotDetect
        })
        await Promise.all([p1, p2, p3, p4])
        await m.reply('Tunggu bentar') 
        let _ramTotal = (ramTotal + ' MB')
        let neww = performance.now()
        conn.reply(m.chat, `
  *Status Bot Saat Ini*

OS: *${OS}*
CPU Model: *${cpuModel}*
CPU Core: *${cpuCore} Core*
CPU: *${cpuPer}%*
Ram: *${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})*
Drive: *${driveUsed} / ${driveTotal} (${drivePer})*
Ping: *${Math.round(neww - old)} ms*
Internet IN: *${netsIn}*
Internet OUT: *${netsOut}*
`.trim(), m)
          console.log(OS)
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        }
    }
}
handler.help = ['', 'bot'].map(v => 'status' + v)
handler.tags = ['main']
handler.command = /^botstats$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

