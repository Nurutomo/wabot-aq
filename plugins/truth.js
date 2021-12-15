/*
Made by Aine
*/

let handler = async (m, { conn }) => {
	let img = 'https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg'
    let trut = [
"Pernah ngambil uang ortu apa ga?",
"Pernah bohong sama ortu apa aja?\nCoba ceritakan tentang kebohongannya",
"Apa makanan yang kamu sukai?",
"Siapa yang mau di jadikan pacar di gc ini?",
"Apa mimpi terburukmu?",
"Apa hal paling memalukan dari temanmu?",
"Pernah suka sama siapa aja? berapa lama?",
"Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)",
"Apa ketakutan terbesar kamu?",
"Pernah suka sama orang dan merasa orang itu suka sama kamu juga?",
"Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?",
"Pernah gak nyuri uang nyokap atau bokap? Alesanya?",
"Hal yang bikin seneng pas lu lagi sedih apa?",
"Pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?",
"Pernah jadi selingkuhan orang?",
"Hal yang paling ditakutin",
"Siapa orang yang paling berpengaruh kepada kehidupanmu",
"Hal membanggakan apa yang kamu dapatkan di tahun ini",
"Siapa orang yang bisa membuatmu sange :v",
"Sapa orang yang pernah buatmu sange",
"(bgi yg muslim) pernah ga solat seharian?",
"Siapa yang paling mendekati tipe pasangan idealmu di sini",
"Suka mabar(main bareng)sama siapa?",
"Pernah nolak orang? alasannya kenapa?",
"Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget",
"Pencapaian yang udah didapet apa aja ditahun ini?",
"Kebiasaan terburuk lo pas di sekolah apa?"
]  // tambahin kata kata sendiri 
	conn.sendFile(m.chat, img, 'maker.jpeg', `*Truth*\n\n“${pickRandom(trut)}”`, m, false, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['truth']
handler.tags = ['fun']
handler.command = /^(truth|kebenaran|kejujuran)$/i
handler.limit = true

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
