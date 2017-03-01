/*
*	popup.js
*	Freewar Helper
*
*/

/* savedVariables - used internally */
var savedVariables = {
	ready: false,
	expectedInfoCount: 1, // DONT TOUCH
	currentInfoCount: 0,
	injected: false,
};

/* npcs - contains all saved npcs */
var npcs = [];



/*
*	CustomEventHandler
*/
var eventHandler = {
	events: {},
	addEventListener: function(eventName, handler){
		if(!(eventName in this.events))
			this.events[eventName] = [];
		
		this.events[eventName].push(handler);
	},
	raiseEvent: function(eventName, args) {
		var currentEvents = this.events[eventName];
		if(!currentEvents) return;
		
		for(var i = 0; i < currentEvents.length; i++) {
			if(typeof currentEvents[i] == 'function')
				currentEvents[i](args);
		}
	},
	ready: function(source) {
		var rdyEvent = new CustomEvent('ready', {
			detail: {
				source: source
			}
		});
		eventHandler.raiseEvent('ready', rdyEvent);
	}
};
eventHandler.addEventListener('ready', function(event) {
	switch(event.detail.source){
		case 'Tab': 
			savedVariables.currentInfoCount += 1;
			break;
		case 'savedVariables':
			savedVariables.currentInfoCount += 1;
			break;
		case 'NPCS':
			savedVariables.currentInfoCount += 1;
			break;
		case 'Storage':
			savedVariables.currentInfoCount += 1;
			break;
	};
	if(savedVariables.currentInfoCount == savedVariables.expectedInfoCount)
		savedVariables.ready = true;
});


/*
*	EventListeners - DOMContent 
*/
document.addEventListener('DOMContentLoaded', function(event) {
	
});

/* 
*	EventListeners - Storage
*/
chrome.storage.onChanged.addListener(function(changed, namespace) {

});

/* Helper Functions */
function initialize(){
	if(savedVariables){
		savedVariables.currentInfoCount = 0;
	}
	
	getTab(function(tab) {
		eventHandler.ready('Tab');
	});
	load('savedVariables', function(data) {
		if(data) {
			for(var variable in savedVariables){
				for(var newVariable in data){
					if(variable == newVariable)
						savedVariables[variable] = data[newVariable];
				}
			}
		}
		eventHandler.ready('savedVariables');
	});
	load('npcs', function(data) {
		if(data) {
			npcs = data;
		}
		drawNpcs();
		eventHandler.ready('NPCS');
	});
};

function getTab(callback){
	var cb = callback;
	chrome.tabs.query({}, function(tabs) {
		var expression = /https:\/\/welt[0-9]{1,2}.freewar.de/;
		var regexp = new RegExp(expression);
		for(var i = 0; i < tabs.length; i++){
			if(tabs[i].url && regexp.test(tabs[i].url)){
				savedVariables.freewarTab = tabs[i];
				savedVariables.freewarTabId = tabs[i].id;
				cb(savedVariables.freewarTab);
			}
		}
		cb(new Error('Tab not found!'));
	});
};

function load(type, callback){
	var cb = callback;
	chrome.storage.sync.get(type, function(result) {
		if(!result[type]) {
			createStorage(type, function() {
				cb(null);
			});
			return;
		}
		
		cb(result[type]);
	});
};

function save(type, data, callback){
	var cb = callback;
	switch(type){
		case 'npcs':
			npcs = data;
			break;
		case 'savedVariables': 
			savedVariables = data;
			break;
	}
	
	var obj = {};
	obj[type] = data;
	chrome.storage.sync.set(obj, function(){
		cb();
		console.log('Data saved'); //Debug
	});
}

function createStorage(type, callback){
	var cb = callback;
	
	chrome.storage.sync.set({ type: new Array(0) }, function() {
		cb(null);
	});
};

function drawNpcs(){
	if(npcs.length == 0){
		return;
	}
	for(var i = 0; i < npcs.length; i++){
		drawNpc(npcs[i], i, function(){ //callback for debug
			
		});
	}
};

function drawNpc(npc, npcId, callback){
	var id = npcId;
	var cb = callback;
	var npcHtmlString = '<tr><td>' + npc.name + ' </td><td>' + npc.type + '</td><td>' + npc.coordinates.x + '</td><td>' + npc.coordinates.y  + '</td><td><button id="' + id + '" class="btn btn-success btn-xs send"><span class="glyphicon glyphicon-share"></span></button></td><td><button id="' + id + '" type="button" class="btn btn-danger btn-xs delete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>'
	
	var newRow = $('#npcBody').append(npcHtmlString);
	
	$('#' + id + '.delete').click(function(event) {
		deleteNpc(id);
	});
	
	$('#' + id + '.send').click(function(event) {
		sendNpc(id);
	});

	cb();
};

function deleteNpc(npcId){
	$('#npcTable' + ( npcId + 1) ).closest('tr').remove();
	
	load('npcs', function(data) {
		data.splice(npcId, 1);
		save('npcs', data, function(){
				location.reload();
		});
	});
}

function sendNpc(id){
	if(npcs.length == 0 || npcs.length - 1 < id)
		return;
	var npc = npcs[id];
	
	chrome.tabs.sendMessage(savedVariables.freewarTabId, { 'npc': npc }, function(response){
		
	});
}

/* Start */

initialize();
