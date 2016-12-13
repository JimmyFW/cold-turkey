// Reference: http://stackoverflow.com/questions/23339944/remember-state-chrome-extension

var blockId = window.setInterval(blockAndDisplay, 10);
chrome.storage.local.get('toggle', function(data) {
	if (data.toggle === false) {
		console.log("Allow content");
		window.clearInterval(blockId);
	} else {
		console.log("Block content!");
	}
});

function submitReason(event) {
	console.log('submit reason ' + event.keyCode);
	if (event.keyCode == 13) {

		console.log(this.value);
		var http = new XMLHttpRequest();

		var queryString = "";
		queryString += "reason=" + this.value;

		http.open("POST", url, true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		console.log(queryString);

		http.send(queryString);
	}
}

function blockAndDisplay() {
	var content = document.getElementById('content');
	if (content.getAttribute('role') != 'weed') {
		content.innerHTML = "";
		content.setAttribute('role', 'weed');
		var textbox = document.createElement('input');
		textbox.setAttribute('type', 'text');
		textbox.setAttribute('name', 'reason');
		textbox.onkeypress = submitReason;
		var question = document.createTextNode("Why did you come to YouTube?  ");
		content.appendChild(question);
		content.appendChild(textbox);
	}

	var mastHead = document.getElementById('video-masthead-container');
	if (mastHead != null) {
		mastHead.innerHTML = "";
	}
}
