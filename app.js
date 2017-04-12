chrome.runtime.sendMessage({requestSettings: true}, function(res) {
	freedom = res.freedom;
	distractions = res.distractions;
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

		var graphsBox = document.getElementById('turkey-graphs');
		if (graphsBox != null) {
			var timeMetric = document.createTextNode("Your visits occurred at these times: ");
			var timeList = document.createElement('ul');
			for (var i = 0; i < res.visits.length; i++) {
				var timePoint = document.createElement('li');
				
				timePoint.innerHTML = "";
				timePoint.innerHTML += getTimeStringFromTimestamp(res.visits[i].visitTime);

				timeList.appendChild(timePoint);
			}
			graphsBox.appendChild(timeMetric);
			graphsBox.appendChild(timeList);
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

function removeNode(node, parent) {
	if (node != null) {
		if (node.parentNode == parent) {
			parent.removeChild(node);
		} else {
			console.log(node.parentNode);
		}
	}
}

function removeNode(node) {
	if (node != null) {
		var parent = node.parentNode;
		if (parent != null) {
			node.parentNode.removeChild(node);
		} else {
			console.log("Node's parent is null.");
		}
	} else {
		console.log("Node is null.");
	}
}

function blockAndDisplay() {
	var container = document.getElementById('page');

	if (distractions == "true") {
		// modify player page
		console.log("killing sidebar and discussion");
		var watchMain = document.getElementById("watch7-main");
		var watchSidebar = document.getElementById("watch7-sidebar");
		var watchDiscussion = document.getElementById("watch-discussion");
		removeNode(watchSidebar);
		removeNode(watchDiscussion);

		// modify home page
		//var feed = document.getElementById("feed");
		var feedMain = document.getElementById("feed-main-what_to_watch");
		removeNode(feedMain);

		// modify trending page
		var browseItems = document.getElementById("browse-items-primary");
		removeNode(browseItems);
	} else {
		console.log("killing all content");
		var content = document.getElementById('content');
		removeNode(content);
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
	var graphsBox = document.createElement('div');
	graphsBox.setAttribute('id', 'turkey-graphs');
	graphsBox.setAttribute('style', 'margin: 20px;')
	container.appendChild(graphsBox);
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

function getTimeStringFromTimestamp(timestamp) {
	var date = new Date(timestamp);
	var timeString = "";
	var hours = date.getHours();
	var ampm = " AM";
	if (hours > 12) {
		hours -= 12;
		ampm = " PM";
	}
	var minutes = date.getMinutes() + "";
	if (minutes.length === 1) {
		minutes = "0" + minutes;
	}

	timeString += hours;
	timeString += ":";
	timeString += minutes;
	timeString += ampm;
	return timeString;
}