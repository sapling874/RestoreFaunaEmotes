importScripts("../common/video-ids.js", "../common/badges-base64.js", "../common/decode.js", "../common/patch-message.js");

async function loadData(videoId) {
	const fileLocation = chrome.runtime.getURL(`chat_data/${videoId}.live_chat.json.gz`);

	ds = new DecompressionStream("gzip");
	data = await fetch(fileLocation);
	blob = await data.blob();
	streamData = blob.stream().pipeThrough(ds);
	jsonData = await new Response(streamData).json();
	
	console.debug("Loaded chat data for video ID: ", videoId);
	console.debug("Loaded from file location ", fileLocation);

	return jsonData;
}

async function patchActions(sendResponse, videoId, actions, isInitialData) {
	chatData = await loadData(videoId);

	var initialDataStore = {};

	for (const action of actions) {
		patchMessage(action, chatData, initialDataStore, isInitialData);
	}

	if (isInitialData) {
		sendResponse([actions, initialDataStore]);
	} else {
		sendResponse(actions);
	}
}

async function getHighlights(sendResponse, videoId) {
	chatData = await loadData(videoId);

	if (chatData.hasOwnProperty("highlights")) {
		console.log("Loaded highlights: ", chatData["highlights"]);
		sendResponse(chatData["highlights"]);
	} else {
		console.log("Not found highlights");
		sendResponse({});
	}
}

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
	if (msg.action == "patchActions") {
		patchActions(sendResponse, msg.videoId, msg.actions);
	}
	return true;
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action == "isFaunaVideoId") {
		sendResponse(faunaVideoIds.includes(msg.videoId));
	}
	if (msg.action == "patchInitialData") {
		patchActions(sendResponse, msg.videoId, msg.actions, true);
	}
	if (msg.action == "getHighlights") {
		getHighlights(sendResponse, msg.videoId);
	}
	return true;
});
