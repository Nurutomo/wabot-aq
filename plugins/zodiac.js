let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0] || !args[1] || !args[2]) throw `contoh:\n${usedPrefix + command} 25 02 2002`

    const lahirnya = args[0] + ' - ' + args[1] + ' - ' + args[2]
    const zodiakz = await getzodiak(args[1], args[0])
    var d = new Date()
    const tahun = d.getFullYear()
    const bulan = d.getMonth() + 1
    const tanggal = d.getDate()
    const tahunbesok = tahun + 1
    const ultahnya = args[0] + ' - ' + args[1] + ' - ' + tahun
    if (args[1] > bulan) {
        var usianya = tahun - args[2] + 1
        var ultahnye = args[0] + ' - ' + args[1] + ' - ' + tahunbesok
    } else {
        var usianya = tahun - args[2]
        var ultahnye = args[0] + ' - ' + args[1] + ' - ' + tahun
    }
    if (args[1] == bulan) {
        if (args[0] > tanggal) {
            var usiamuda = usianya + 1
            var ultahmuda = args[0] + ' - ' + args[1] + ' - ' + tahunbesok
        } else {
            var usiamuda = usianya
            var ultahmuda = args[0] + ' - ' + args[1] + ' - ' + tahun
        }
    } else {
        var usiamuda = usianya
        var ultahmuda = args[0] + ' - ' + args[1] + ' - ' + tahun
    }
    if (args[0] == tanggal) {
        if (args[1] == bulan) {
            var cekusia = `Selamat ulang tahun yang ke-${usiamuda} 🥳`
            var cekultah = ultahmuda
        } else {
            var cekusia = usiamuda
            var cekultah = ultahmuda
        }
    } else {
        var cekusia = usiamuda
        var cekultah = ultahmuda
    }
    const cabit = `Lahir : ${lahirnya}
Ultah Mendatang : ${cekultah}
Usia : ${cekusia}
Zodiak : ${zodiakz}`
    m.reply(cabit)
}
handler.help = ['zodiac *25 02 2002*']
handler.tags = ['tools']

handler.command = /^zodia[kc]$/i

module.exports = handler

const zodiak = [
    ["Capricorn", new Date(1970, 0, 1)],
    ["Aquarius", new Date(1970, 0, 20)],
    ["Pisces", new Date(1970, 1, 19)],
    ["Aries", new Date(1970, 2, 21)],
    ["Taurus", new Date(1970, 3, 21)],
    ["Gemini", new Date(1970, 4, 21)],
    ["Cancer", new Date(1970, 5, 22)],
    ["Leo", new Date(1970, 6, 23)],
    ["Virgo", new Date(1970, 7, 23)],
    ["Libra", new Date(1970, 8, 23)],
    ["Scorpio", new Date(1970, 9, 23)],
    ["Sagittarius", new Date(1970, 10, 22)],
    ["Capricorn", new Date(1970, 11, 22)]
]

function getzodiak(month, day) {
    let d = new Date(1970, month - 1, day)
    return zodiak.find(([_,_d]) => d >= _d)[0]
}
