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
	}
});