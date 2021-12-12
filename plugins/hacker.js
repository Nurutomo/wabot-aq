let fs = require('fs')

let handler = async (m, { conn, usedPrefix }) => {
  conn.reply(m.chat, `*${pickRandom(hacker)}*`, m)
}
handler.help = ['hacker']
handler.tags = ['quotes']
handler.command = /^(hacker)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const hacker = [
"Dear kamu yang tertulis di halaman defacementku, Kapan jadi pacarku?",
"Aku rela ko jadi Processor yg kepanasan, asalkan kmu yg jadi heatsink'y yg setiap saat bisa mendinginkan ku.",
"Gak usah nyari celah xss deh, karena ketika kamu ngeklik hatiku udah muncul pop up namamu.",
"berharap setelah aku berhasil login di hati kamu ga akan ada tombol logout, dan sessionku ga bakal pernah expired.",
"Masa aku harus pake teknik symlink bypass buat buka-buka folder hatimu yg open_basedir enabled.",
"Diriku dan Dirimu itu ibarat PHP dan MySQL yang belum terkoneksi.",
"Jangan cuma bisa inject hatinya,tapi harus bisa patchnya juga. Biar tidak selingkuh sama hacker lain.",
"Aku memang programmer PHP,tapi aku nggak akan php-in kamu kok.",
"Eneeeng. | Apache? | Km wanita yg paling Unix yg pernah aku kenal |",
"Sayang, capslock kamu nyala ya? | ngga, kenapa emangnya? | soalnya nama kamu ketulis gede bgt di hati aku | zzz! smile",
"Aku deketin kamu cuma untuk redirect ke hati temenmu.",
"Domain aja bisa parkir, masa cintaku ga bisa parkir dihatimu?",
"Aku boleh jadi pacarmu? | 400(Bad Request) | Aku cium boleh? | 401(Authorization Required) | Aku buka bajumu yah | 402(Payment Required) sad",
"kamu tau ga beda'y kamu sama sintax PHP, kalo sintax PHP itu susah di hafalin kalo kamu itu susah di lupain",
"Kamu dulu sekolah SMK ambil kejuruan apa? | Teknik Komputer Jaringan | Terus sekarang bisa apa aja? | Menjaring hatimu lewat komputerku | biggrin",
"Jika cinta itu Array, maka,cintaku padamu tak pernah empty jika di unset().",
"SQLI ( Structured Query Love Injection )",
"aku ingin kamu rm -rf kan semua mantan di otak mu,akulah root hati kamu",
"Senyumu bagaikan cooler yang menyejukan hatiku ketika sedang overclock.",
"kamu adalah terminalku, dimana aku menghabiskan waktuku untuk mengetikan beribu baris kode cinta untukmu smile",
"Aku seneng nongkrong di zone-h, karena disanalah aku arsipkan beberapa website yang ada foto kamunya.",
"hatiku ibarat vps hanya untukmu saja bukan shared hosting yg bisa tumpuk berbagai domain cinta.",
"Aku bukanlah VNC Server Tanpa Authentication yg bisa kamu pantau kapan saja.",
"Jangan men-dualboot-kan hatiku kepadamu.",
"cintaku kan ku Ctrl+A lalu kan ku Ctrl+C dan kan ku Ctrl+V tepat di folder system hatimu.",
"KDE kalah Cantiknya, GNOME kalah Simplenya, FluxBox kalah Ringannya, pokonya Semua DE itu Kalah Sama Kamu.",
"Cintamu bagaikan TeamViewer yang selalu mengendalikan hatiku",
"cinta kita tak akan bisa dipisahkan walau setebal apapun itu firewall...!!"
]
