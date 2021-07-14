<?php
//Get the status and decode the JSON
$status = json_decode(file_get_contents('https://api.mcsrvstat.us/2/domain.tld'));

//Show the version
echo $status->version;

//Show a list of players
foreach ($status->players->list as $player) {
	echo $player.'<br />';
}
handler.help = ['memeg'].map(v => v + '<apa|apa>')
handler.tags = ['tools']
handler.command = /^(memeg)$/i

module.exports = handler
?>
