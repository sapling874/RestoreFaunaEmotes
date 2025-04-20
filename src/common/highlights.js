function createHighlights(highlights) {
	if (highlights.length == 0) {
		return;
	}

	const parentDocument = window.parent.document;
	const video = parentDocument.querySelector("video");
	const duration = video.duration;
	const progressBar = parentDocument.querySelector(".ytp-progress-bar-container");

	for (const [timestamp, emoteNumber] of Object.entries(highlights)) {
		const emoteName = decodeEmotes(emoteNumber).next().value;
		const image = `emotes/${emoteName}.png`
		const imageURL = chrome.runtime.getURL(image);
		
		percentPlacement = 100*(timestamp/duration);

		const img = parentDocument.createElement("img");
		img.src = imageURL;
		img.style = `position: absolute; bottom: 10px; height: 2.75rem; width: 2.75rem; left: ${percentPlacement}%; transform: translate(-50%);`;
		img.onclick = function() {
			video.currentTime = timestamp;
		}

		progressBar.appendChild(img);
	}
}
