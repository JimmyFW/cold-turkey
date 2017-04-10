chrome.runtime.sendMessage({requestFreedom: true}, function(res) {
	freedom = res.freedom;
	blockIfFree();
	fetchVisits();
});

function fetchVisits() {
	chrome.runtime.sendMessage({requestVisits: true}, function(res) {
		console.log(res);
		var counterBox = document.getElementById('turkey-counter');
		if (counterBox != null) {
			var counterMetric = document.createTextNode("You've visited YouTube " + res.visits.length + " times today.");
			counterBox.appendChild(counterMetric);
		}
	});
}

document.getElementById('content').addEventListener('DOMSubtreeModified', blockOnDebouncedDOMEvents);

function blockOnDebouncedDOMEvents() {
	console.log("detected dom subtree modifiedcation");
	var content = document.getElementById('content');
	if (content != null) {
		content.removeEventListener('DOMSubtreeModified', blockOnDebouncedDOMEvents);
		setTimeout(function () {
				blockIfFree();
				var content = document.getElementById('content');
				if (content != null) {
					content.addEventListener('DOMSubtreeModified', blockOnDebouncedDOMEvents);
				}
			}, 500);
	}
}

function blockIfFree() {
	if (freedom === null) {
		alert('freedom not set');
	} else if (freedom == "false") {
		console.log("Allow content");
		//window.clearInterval(blockId);
	} else {
		console.log("Block content!");
		blockAndDisplay();
		//blockId = window.setInterval(blockAndDisplay, 10);
	}
}

function submitReason(event) {
	if (event.keyCode == 13) {
		console.log('submit reason ' + event.keyCode);
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
	var container = document.getElementById('page');

	// remove the content pane if it exists
	var content = document.getElementById('content');
	if (content != null) {
		if (content.parentNode == container) {
			container.removeChild(content);
		} else {
			console.log(content.parentNode);
		}
	}

	// add the counter pane if it hasn't been added yet
	var maybeCounter = document.getElementById('turkey-counter');
	if (maybeCounter == null) {
		appendCounterPane(container);
	}

	// add the question pane if it hasn't been added yet
	var maybeQuestion = document.getElementById('question');
	if (maybeQuestion == null) {
		appendQuestionPane(container);
	}

	var mastHead = document.getElementById('video-masthead-container');
	if (mastHead != null) {
		mastHead.innerHTML = "";
	}
}

function appendCounterPane(container) {
	var counterBox = document.createElement('div');
	counterBox.setAttribute('id', 'turkey-counter');
	counterBox.setAttribute('style', 'margin: 20px;')
	container.appendChild(counterBox);
}

function appendQuestionPane(container) {
	var question = document.createElement('div');
	question.setAttribute('id', 'question');
	question.setAttribute('style', 'margin: 20px;')

	var textbox = document.createElement('input');
	textbox.setAttribute('type', 'text');
	textbox.setAttribute('name', 'reason');
	textbox.onkeypress = submitReason;
	var questionText = document.createTextNode("Why are you on YouTube?");
	question.appendChild(questionText);
	question.appendChild(textbox);

	container.appendChild(question);
}