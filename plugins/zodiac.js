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
handler.command = /^zodia(k|c)$/i
module.exports = handler

function getzodiak(month, day) {
    var d = new Date(1999, month - 1, day, 0, 0, 0);
    var arr = [];
    arr.push(["Capricorn", new Date(1999, 0, 1, 0, 0, 0)])
    arr.push(["Aquarius", new Date(1999, 0, 20, 0, 0, 0)])
    arr.push(["Pisces", new Date(1999, 1, 19, 0, 0, 0)])
    arr.push(["Aries", new Date(1999, 2, 21, 0, 0, 0)])
    arr.push(["Taurus", new Date(1999, 3, 21, 0, 0, 0)])
    arr.push(["Gemini", new Date(1999, 4, 21, 0, 0, 0)])
    arr.push(["Cancer", new Date(1999, 5, 22, 0, 0, 0)])
    arr.push(["Leo", new Date(1999, 6, 23, 0, 0, 0)])
    arr.push(["Virgo", new Date(1999, 7, 23, 0, 0, 0)])
    arr.push(["Libra", new Date(1999, 8, 23, 0, 0, 0)])
    arr.push(["Scorpio", new Date(1999, 9, 23, 0, 0, 0)])
    arr.push(["Sagittarius", new Date(1999, 10, 22, 0, 0, 0)])
    arr.push(["Capricorn", new Date(1999, 11, 22, 0, 0, 0)])
    for (var i = arr.length - 1; i >= 0; i--) {
        if (d >= arr[i][1]) return arr[i][0];
    }
}
