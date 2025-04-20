// Pass the extension ID to the main world script
// by way of an invisible div.
// It needs the ID to be able to communicate with
// the background process.
idDiv = document.createElement("div");
idDiv.id = "fauna-extension-id";
idDiv.textContent = chrome.runtime.id;
idDiv.style = "display: none;"
document.querySelector("body").appendChild(idDiv);

var videoId;
const searchParams = new URLSearchParams(window.parent.location.search);
if (searchParams.has("v")) {
	videoId = searchParams.get("v");
}

var timestampNameData = {};

async function replaceInitialData() {
	const scripts = document.querySelector("body").querySelectorAll("script");
	if (!scripts) {
		return;
	}

	for (const script of scripts) {
		const start = 'window["ytInitialData"] = ';
		const text = script.text;
		if (!text || !text.startsWith(start)) {
			continue;
		}
		const initialData = JSON.parse(text.replace(start, '').slice(0, -1));

		const [patchedActions, dataStore] = await chrome.runtime.sendMessage({
			"action": "patchInitialData",
			"videoId": videoId,
			"actions": initialData.continuationContents.liveChatContinuation.actions
		});

		timestampNameData = dataStore;

		initialData.continuationContents.liveChatContinuation.actions = patchedActions;
		stringData = JSON.stringify(initialData);
		script.text = `${start}${stringData};`;
	}
}

(async () => {
	isFaunaVideoId = await chrome.runtime.sendMessage({
		"action": "isFaunaVideoId",
		"videoId": videoId
	});
	if (isFaunaVideoId) {
		await replaceInitialData();
		highlights = await chrome.runtime.sendMessage({
			"action": "getHighlights",
			"videoId": videoId
		});
		createHighlights(highlights);
	}
})();

