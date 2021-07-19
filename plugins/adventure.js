let handler = async (m, { conn, isPrems, text }) => {
	let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
	if (!teks) throw 'alasannya mana pak?'
	let countrt = ['inggris','arab saudi','uni emirate arab','sri langka','finlandia','india','australia','china','jepang','korea utara','kenya','timor leste','malaysia','amerika serikat','kanada','brazil','swedia','uzbekistan','qatar','thailand','islandia','new zealand','papua nugini','mexsico','texas','arab saudi','qatar']
let country = countrt[Math.floor(Math.random() * countrt.length)]
let yoi = Math.floor(Math.random() * 10) + 100
let yoih = Math.floor(Math.random() * 10) + 100
let bekal = Math.floor(Math.random() * 2) + 12
global.db.data.users[m.sender].exp += isPrems ? yoih : yoi
m.reply(`*Perjalanan Kamu Berhenti*\nhanya Sampai di *🏳️${country}*\n*Dikarenakan :* ${text}\n\nhadiah kamu !\n**️⃣ Exp :* +${isPrems ? yoih : yoi}\n*🍒 Buah :* ${bekal}\n\n*@Rizxyu*`)
}

handler.help = ['adventure']
handler.tags = ['game']
handler.command = /^adventure/i

module.exports = handler
//Belajar bikin SCript dan fitur
