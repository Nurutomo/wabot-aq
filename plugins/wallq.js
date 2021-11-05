let axios = require("axios");
let handler = async (m, { conn, text }) => {
  let res 
  if (text) res = await axios.get(
    global.API("https://wall.alphacoders.com/api2.0", "/get.php", {
      auth: "3e7756c85df54b78f934a284c11abe4e",
      method: "search",
      term: text,
    })
  )
    else res = await axios.get(
    global.API("https://wall.alphacoders.com/api2.0", "/get.php", {
      auth: "3e7756c85df54b78f934a284c11abe4e",
      method: "latest",
    })
  )

  if (res.status !== 200) throw await `${res.status} ${res.statusText}`;
  if (!res.data.wallpapers) throw res.data
  let img = res.data.wallpapers[Math.floor(Math.random() * res.data.wallpapers.length)];
  await conn.sendFile(m.chat, img.url_image, text + `.${img.file_type}`, img.url_page, m);
};
handler.help = ["wallpaperq"];
handler.tags = ["tools"];
handler.command = /^wall(paper)?q?$/i;
handler.limit = true;

module.exports = handler;
