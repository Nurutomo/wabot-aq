let fetch = require("node-fetch");
let handler = async (m, { conn, command }) => {
	if (m.quoted && m.quoted.sender) m.mentionedJid.push(m.quoted.sender);
	if (!m.mentionedJid.length) m.mentionedJid.push(m.sender);
	let res = await fetch(
		API("https://some-random-api.ml", "/animu/" + command, {})
	);
	if (!res.ok) throw `${res.status} ${res.statusText}`;
	let json = await res.json();
	if (json.link)
		conn.sendFile(
			m.chat,
			json.link,
			"wibukontol.gif",
			`@${m.sender.split("@")[0]} ${command} ${m.mentionedJid
				.map((user) =>
					user === m.sender ? "themselves " : `@${user.split("@")[0]}`
				)
				.join(", ")}`,
			m,
			false,
			{
				asGIF: true,
				contextInfo: {
					mentionedJid: [...m.mentionedJid, m.sender],
				},
			}
		);
	else throw json;
};
handler.help = ["hug", "pat", "wink"];
handler.tags = ["fun"];
handler.command = /^(hug|pat|wink)$/i;

module.exports = handler;
