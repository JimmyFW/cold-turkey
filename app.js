// Reference: http://stackoverflow.com/questions/23339944/remember-state-chrome-extension
//window.setInterval(blockAndDisplay, 10);
//document.getElementsByTagName('body')[0].addEventListener("mouseover", checkToBlock);

var blockId = window.setInterval(blockAndDisplay, 10);
chrome.storage.local.get('toggle', function(data) {
	if (data.toggle === false) {
		console.log("no");
		window.clearInterval(blockId);
	} else {
		console.log("yeah");
		/* do some css inject */
	}
});

function blockAndDisplay() {
	var content = document.getElementById('content');
	if (content != null) {
		content.innerHTML = "Why did you come to YouTube?";
	}
	var mastHead = document.getElementById('video-masthead-container');
	if (mastHead != null) {
		mastHead.innerHTML = "";
	}
}

function checkToBlock() {
	chrome.storage.local.get('toggle', function(data) {
		if (data.toggle === false) {
			console.log("no");
		} else {
			console.log("yeah");
			window.setInterval(blockAndDisplay, 10);
			/* do some css inject */
		}
	});
}

/*
if (toggle) {
	document.getElementsByTagName('body')[0].addEventListener("mouseover", blockAndDisplay);
	window.setInterval(blockAndDisplay, 10);
}
*/


/*
var timestamp = new Date().getTime();
var key = "YouTube" + timestamp;
chrome.storage.sync.set({key: ""}, function() {
	console.log("Saved to storage: " + key);
});
*/