/*
*	background.js
*	Handles data sent from content_script to extension
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(!request)
		return;
	
	if(request.type == 'add'){
		performNpcAction(request.npc, function(){
			console.log('npc saved');
		});
	}
	if(request.type == 'deleteNPCs'){
		
	}
	
});

/* HELPER functions */
function performNpcAction(npc, callback){
	var cb = callback;
	switch(npc.type){
		case 'NPC': 
			
			break;
		case 'Gruppen-NPC':
			checkNpc(npc, function(alreadySaved) {
				if(alreadySaved)
					return;
				saveNpc(npc, function(){
					console.log('npc saved');
				});
			});
			break;
		case 'Unique-NPC':
			checkNpc(npc, function(alreadySaved) {
				if(alreadySaved)
					return;
				saveNpc(npc, function(){
					console.log('npc saved');
				});
			});
			break;
	}
};

function saveNpc(npc, callback){
	var cb = callback;
	chrome.storage.sync.get('npcs', function(result){
		var newNpcs = [];
		if(result.npcs)
			newNpcs = result.npcs;
		newNpcs.push(npc);
		
		chrome.storage.sync.set({ 'npcs': newNpcs }, function(){
			cb();
		});
	});
};

function checkNpc(npc, callback){
	var cb = callback;
	chrome.storage.sync.get('npcs', function(result) {
		if(!result.npcs){
			cb(false);
			return;
		}
		for(var i = 0; i < result.npcs.length; i++){
			if(isSame(npc, result.npcs[i])){
				cb(true);
				return;
			}
		}
		cb(false);
		return;	
	});
};

function isSame(npc1, npc2){
	if(npc1.name == npc2.name){
		var npc1_coords = npc1.coordinates;
		var npc2_coords = npc2.coordinates;
		
		if(npc1_coords.x == npc2_coords.x && npc1_coords.y == npc2_coords.y){
			return true;
		}
	}
	return false;
}