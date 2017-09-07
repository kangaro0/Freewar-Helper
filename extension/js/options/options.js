/*
*	options.js
*
*/

// holds received contentScripts
var contentScripts = [];


// run when ready
$(document).ready(function(event){
	load('contentScripts', function(error) {
		if(error){
			firstStart();
			return;
		}
	});
});

/* Helper Functions */

function load(type, callback){
	var cb = callback;
	
	switch(type){
		case "contentScripts":
			chrome.storage.sync.get('contentScripts', function(result){
				if(!result.contentScripts){
					cb(new Error('No contentscripts'));
					return;
				}
				for(var i = 0; i < result.contentScripts.length; i++){
					contentScripts.push(result.contentScripts[i]);
				}
				cb(null);
				
			});
			break;
	}
}

function create(type, callback){
	
};

function firstStart(){
	
}

/* Classes for ContentScripts */

var ContentScriptHandler = function(options){
	
};

ContentScriptHandler.prototype.load = function(callback){
	var cb = callback;
	chrome.storage.sync.get('contentScripts', function(result){
		if(!result.contentScripts){
			cb(new Error('No contentscripts'));
			return;
		}
		for(var i = 0; i < result.contentScripts.length; i++){
			contentScripts.push(result.contentScripts[i]);
		}
		cb(null);
	});
};

ContentScriptHandler.prototype.firstStart = function(){
	// initialize basic storage structure
	
	var contentScripts  = {
		""
	}
	chrome.storage.sync.set()
}




