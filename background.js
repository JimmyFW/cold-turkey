chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.requestFreedom) {
		sendResponse({freedom: localStorage.getItem("freedom")});
	}
});