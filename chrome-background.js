importScripts("./video-ids.js", "./badges-base64.js", "./decode.js", "patch-message.js");

async function patchActions(sendResponse, videoId, actions, isInitialData) {
	const fileLocation = chrome.runtime.getURL(`chat_data/${videoId}.live_chat.json.gz`);

	ds = new DecompressionStream("gzip");
	data = await fetch(fileLocation);
	blob = await data.blob();
	streamData = blob.stream().pipeThrough(ds);
	jsonData = await new Response(streamData).json();
	chatData = jsonData;
	
	console.debug("Loaded chat data for video ID: ", videoId);
	console.debug("Loaded from file location ", fileLocation);

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
	return true;
});
