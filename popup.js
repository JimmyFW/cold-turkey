document.getElementById("toggleon").onclick = function() {
	console.log("Toggle on");
	chrome.tabs.executeScript(null, {
		code: "chrome.storage.local.set({'toggle': true});"
	});
};

document.getElementById("toggleoff").onclick = function() {
	console.log("Toggle off");
	chrome.tabs.executeScript(null, {
		code: "chrome.storage.local.set({'toggle': false});"
	});
}
