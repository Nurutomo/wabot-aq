global.math = global.math ? global.math : {}
let handler  = async (m, { conn, args, usedPrefix }) => {
  if (args.length < 1) return conn.reply(m.chat, 'Mode: noob | easy | medium | hard | extreme\n\nContoh penggunaan: ' + usedPrefix + 'math medium', m)
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) return conn.reply(m.chat, 'Mode: noob | easy | medium | hard | extreme\n\nContoh penggunaan: ' + usedPrefix + 'math medium', m)
  let id = m.chat
  if (id in global.math) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', global.math[id][0])
  let math = genMath(mode)
  global.math[id] = [
    await conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\nTimeout: ${math.time.toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} XP`, m),
    math, 4,
    setTimeout(() => {
      if (global.math[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${math.result}`, global.math[id][0])
      delete global.math[id]
    }, math.time)
  ]
}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math/i

module.exports = handler

let modes = {
  noob: [-3, 3,-3, 3, '+-', 60000, 35],
  easy: [-10, 10, -10, 10, '+-', 60000, 50],
  medium: [-40, 40, -20, 20, '*/+-', 90000, 150],
  hard: [-100, 100, -70, 70, '*/+-', 180000, 400],
  extreme: [-9999, 9999, -9999, 9999, '*/+-', 300000, 9999]
}

let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}

function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
  let a = randomInt(a1, a2)
  let b = randomInt(b1, b2)
  let op = pickRandom([...ops])
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b}`))()
  if (op == '/') [a, result] = [result, a]
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  }
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from]
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
