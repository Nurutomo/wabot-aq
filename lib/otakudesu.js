const axios = require('axios')
const cheerio = require('cheerio')


const onGoing = async (p) => {
const res = await axios.get(`https://otakudesu.moe/ongoing-anime`)
const $ = cheerio.load(res.data)
const result = []
$('.venz').find('li > div.detpost').each(function(c, d) {
const judul = $(d).find('div.thumb > a > div.thumbz > h2.jdlflm').text()
const thumb = $(d).find('div.thumb > a > div.thumbz > img').attr('src')
const eps = $(d).find('div.epz').text()
const hri = $(d).find('div.epztipe').text()
const link = $(d).find('div.thumb > a').attr('href')
const tgl = $(d).find('div.newnime').text()
result.push({ judul, thumb, eps, hri, tgl, link })
})
return result
}

const otakuSearch = async (search) => {
const res_ = await axios.get(`https://otakudesu.moe/?s=${search}&post_type=anime`)
const sopp = cheerio.load(res_.data)
const hasil = []
const link_dl = {}
const judul_ = sopp('h2').eq(0).text()
const link_ = sopp('h2 > a').attr('title')
const thumb_ = sopp('li > img').attr('src')
const genre = sopp('li > div.set').eq(0).text().replace('Genres : ','')
const status = sopp('li > div.set').eq(1).text().replace('Status : ','')
const rating = sopp('li > div.set').eq(2).text().replace('Rating : ','')
const ress_ = await axios.get(`${link_}`)
const soup = cheerio.load(ress_.data)
const producer = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(4)').text().replace('Produser: ','')
const studio = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(10)').text().replace('Studio:  ','')
const total_eps = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(7)').text().replace('Total Episode: ','')
const japanese_title = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(2)').text().replace('Japanese: ','')
const tipe = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(5)').text().replace('Tipe: ','')
const durasi = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(8)').text().replace('Durasi: ','')
const tgl_rilis = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(9)').text().replace('Tanggal Rilis: ','')
const sinopsis = soup(' div.venser > div.fotoanime > div.sinopc > p').text()   
const batch = soup(' div.venser > div.episodelist > ul > li >span > a').attr('href')
const resss_ = await axios.get(`${batch}`)
const sop = cheerio.load(resss_.data)
const empatDrive = sop('div.venser > div.download > div.batchlink > ul > li > a').eq(8).attr('href')
const tigaDrive =  sop('div.venser > div.download > div.batchlink > ul > li > a').eq(1).attr('href')
const tujuhDrive = sop('div.venser > div.download > div.batchlink > ul > li > a').eq(15).attr('href')
link_dl['360p'] = tigaDrive
link_dl['480p'] = empatDrive
link_dl['720p'] = tujuhDrive
hasil.push({ judul_, link_, thumb_, genre, status, rating, producer, total_eps, sinopsis, japanese_title, tipe, durasi, tgl_rilis, studio, batch, link_dl,tigaDrive,empatDrive,tujuhDrive })

return hasil
}

module.exports = { onGoing, search: otakuSearch }
