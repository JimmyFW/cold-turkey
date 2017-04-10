chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.requestFreedom) {
		sendResponse({freedom: localStorage.getItem("freedom")});
	} else if (request.requestVisits) {
		chrome.history.getVisits({url:"https://www.youtube.com"}, function(results) {
			var visitsToday = [];
			for (var i = 0; i < results.length; i++) {
				if (results[i].visitTime > Date.now()-86400000) {
					visitsToday.push(results[i]);
				}
			}
			console.log(visitsToday);
			sendResponse({visits: visitsToday});
		});
		return true;
	}
});

function dispResults(results) {
	var visitsToday = [];
	for (var i = 0; i < results.length; i++) {
		if (results[i].visitTime > Date.now()-86400000) {
			visitsToday.push(results[i]);
		}
	}
	console.log(visitsToday);
	this.sendResponse({visits: visitsToday});
	//alert("You've visited YouTube " + visitsToday.length + " times today.")
}