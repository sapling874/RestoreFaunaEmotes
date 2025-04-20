var chatData;
var chatDataLoaded = false;

var timestampNameData = {};

function isFaunaArchive(videoId) {
	return faunaVideoIds.includes(videoId);
}

async function loadData(videoId) {
	if (chatDataLoaded) {
		return;
	}

	fileLocation = browser.runtime.getURL(`chat_data/${videoId}.live_chat.json.gz`);

	ds = new DecompressionStream("gzip");
	data = await fetch(fileLocation);
	blob = await data.blob();
	streamData = blob.stream().pipeThrough(ds);
	jsonData = await new Response(streamData).json();
	chatData = jsonData;

	console.debug("Loaded chat data for video ID: ", videoId);
	console.debug("Loaded from file location ", fileLocation);
	chatDataLoaded = true;

	replaceInitialData();

	return;
}

function replaceInitialData() {
	const scripts = document.querySelector("body").querySelectorAll("script");
	if (!scripts) {
		console.error("Unable to get script elements");
		return
	}

	for (const script of scripts) {
		const start = 'window["ytInitialData"] = ';
		const text = script.text;
		if (!text || !text.startsWith(start)) {
			continue;
		}
		const initialData = JSON.parse(text.replace(start, '').slice(0, -1));
		for (const action of initialData.continuationContents.liveChatContinuation.actions) {
			patchMessage(action, chatData, timestampNameData, true);
		}
		stringData = JSON.stringify(initialData);
		script.text = `${start}${stringData};`;
	}
}

function patchActions(actions) {
	actions = JSON.parse(actions);
	for (const action of actions) {
		patchMessage(action, chatData);
	}

	return JSON.stringify(actions);
}

exportFunction(isFaunaArchive, window, {
	defineAs: "isFaunaArchive",
});

exportFunction(loadData, window, {
	defineAs: "faunaLoadData",
});

exportFunction(patchActions, window, {
	defineAs: "faunaPatchActions",
});

console.log("Loading fauna extension (isolated)");

