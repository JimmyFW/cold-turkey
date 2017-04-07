window.addEventListener("load", loadToggleSetting);

function loadToggleSetting() {
	toggle = document.getElementById("toggle");
	toggle.onclick = setFreedom;
	refresh();
}

function setFreedom() {
		var freedom = localStorage.getItem("freedom");
		console.log("setFreedom: localStorage freedom value is " + freedom);
		if (freedom === null) {
			console.log("setFreedom: freedom is null");
			localStorage.setItem("freedom", toggle.checked);
		} else if (freedom === "false") {
			console.log("fredom is false: " + freedom);
			localStorage.setItem("freedom", true);
			refresh();
		} else {
			console.log("fredom is true: " + freedom);
			localStorage.setItem("freedom", false);
			refresh();
		}
	}

function refresh() {
	var freedom = localStorage.getItem("freedom");
	console.log(freedom);
	if (freedom === null) {
		console.log("refresh: freedom is null")
	} else if (freedom === "true") {
		toggle.checked = true;
	} else {
		toggle.checked = false;
	}
}