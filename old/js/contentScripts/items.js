/*
*	items.js
*	Adds functionality to Freewar Game
*	Items	-	click to open wiki page
*	
*	Status	-	not working
*/

$('iframe[name=itemFrame]').load(function(event) {
	var listItemRows = itemFrame.frameElement.contentDocument.querySelectorAll('p.listitemrow');
	
	for(var i = 1; i < listItemRows.length; i++){
		
		var itemRawData = null;
		if(listItemRows[i].childNodes.length == 6){ //Item with picture
			itemRawData = listItemRows[i].childNodes[0].textContent;
		}
		
		if(!itemRawData)
			return;
		var item = {
			name: itemRawData.trim()
		};
		
		var link = document.createElement('a');
		link.setAttribute('href', 'http://www.fwwiki.de/index.php/' + item.name);
		link.setAttribute('target', '_blank');
		link.setAttribute('class', 'wikilink');
		link.innerHtml = item.name;
		
		//var link = '<a class="wikilink" id="' + i + '" href="http://www.fwwiki.de/index.php/' + item.name + '" target="_blank">' + item.name + '</a>';
		listItemRows[i].childNodes[0].value = link;
	}
});