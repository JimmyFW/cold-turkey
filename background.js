chrome.runtime.onInstalled.addListener(function() {
	localStorage.setItem("freedom", "true");
	localStorage.setItem("distractions", "true");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.requestSettings) {
		sendResponse({
			freedom: localStorage.getItem("freedom"),
			distractions: localStorage.getItem("distractions")
		});
	} else if (request.requestVisits) {
		chrome.history.getVisits({url:"https://www.youtube.com"}, function(results) {
			var visitsToday = [];
			var today = new Date();
			today.setHours(0, 0, 0, 0);

			for (var i = 0; i < results.length; i++) {
				if (results[i].visitTime > today.valueOf()) {
					visitsToday.push(results[i]);
				}
			}
			console.log(visitsToday);
			sendResponse({visits: visitsToday});
		});
		return true;
	} else if (request.logSearchTerm) {
		submitReason(request.reason);
	}
});

function submitReason(reason) {
	console.log('submit reason ' + reason);
	var http = new XMLHttpRequest();

	var queryString = "";
	queryString += "reason=" + reason;

	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	console.log(queryString);

	http.send(queryString);
}