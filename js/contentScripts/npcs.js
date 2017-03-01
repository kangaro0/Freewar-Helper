/*
*	npcs.js
*	Adds functionality to Freewar Game
*	NPCs	-	click to open wiki page
*			-	rightclick to add to list
*/

var coordinates = {
	x: null,
	y: null
};


/* EventListeners */

$('iframe[name=mainFrame]').load(function(event) { 
	// Array of all available NPCs/Users
	var listUsersRows = mainFrame.frameElement.contentDocument.querySelectorAll('p.listusersrow');
	
	for(var i = 0; i < listUsersRows.length; i++){
		var npcRawData = null;
		if(listUsersRows[i].childNodes.length == 1) //NPC
			npcRawData = listUsersRows[i].childNodes[0].querySelectorAll('td')[1];
		if(listUsersRows[i].childNodes.length == 9 || listUsersRows[i].childNodes.length == 7) // NPC without picture
			npcRawData = listUsersRows[i];
		
		if(!npcRawData)
			return;
		var npc = {
			name: npcRawData.childNodes[0].textContent.trim(),
			type: npcRawData.childNodes[1].textContent.split('(')[1].split(')')[0],
			coordinates: coordinates
		};
			
		//replace NPC name with link
		var link = '<a class="wikilink" id="' + i + '" href="http://www.fwwiki.de/index.php/' + npc.name + '" target="_blank">' + npc.name + ' </a>';
		npcRawData.childNodes[0].innerHTML = link;
		
		//send npc to extension
		chrome.runtime.sendMessage({ 'type': 'add', 'npc': npc }, function(response) {
			
		});
		
	}
});

$('iframe[name=mapFrame]').load(function(event) {	
	var posText = mapFrame.frameElement.contentDocument.querySelector('p.positiontext').textContent;
	coordinates = {
		x: posText.split(' ')[3],
		y: posText.split(' ')[5],
	};
});

/* Helper Functions */
function addLink(callback){
	var cb = callback;
	
}