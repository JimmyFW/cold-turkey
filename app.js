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

document.getElementsByTagName('body')[0].addEventListener("mouseover", blockAndDisplay);
window.setInterval(blockAndDisplay, 10);