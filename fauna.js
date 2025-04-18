var disabled;
var chatData;
var chatDataLoaded = false;

var timestampNameData = {};

function isFaunaArchive(videoId) {
	return faunaVideoIds.includes(videoId);
}

async function loadData(videoId) {
	if (disabled || chatDataLoaded) {
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

	for (var i=0; i<scripts.length; i++) {
		const start = 'window["ytInitialData"] = ';
		const text = scripts[i].text;
		if (!text || !text.startsWith(start)) {
			continue;
		}
		const initialData = JSON.parse(text.replace(start, '').slice(0, -1));
		for (const action of initialData.continuationContents.liveChatContinuation.actions) {
			patchAction(action, true);
		}
		const newScript = document.createElement("script");
		stringData = JSON.stringify(initialData);
		newScript.text = `${start}${stringData};`;
		document.querySelector("body").querySelectorAll("script")[i].replaceWith(newScript);
	}
}

function patchAction(message, store) {
	if (disabled == true || chatData === undefined) {
		return;
	}

	if (message.hasOwnProperty("wrappedJSObject")) {
		// Objects passed from main window code have a
		// read only wrapper around them. Discard it.
		message = message.wrappedJSObject;
	}

	if (message.replayChatItemAction === undefined) {
		return;
	}
	if (message.replayChatItemAction.actions[0] === undefined) {
		return;
	}

	const action = message.replayChatItemAction.actions[0];

	if (!action.hasOwnProperty("addChatItemAction")) {
		return;
	}
	const item = action.addChatItemAction.item;

	var renderer;
	if (item.hasOwnProperty("liveChatTextMessageRenderer")) {
		// Normal chat message.
		renderer = item.liveChatTextMessageRenderer;
	} else if (item.hasOwnProperty("liveChatMembershipItemRenderer")) {
		// Membership message.
		renderer = item.liveChatMembershipItemRenderer;
	} else if (item.hasOwnProperty("liveChatPaidMessageRenderer")) {
		// Normal superchat.
		renderer = item.liveChatPaidMessageRenderer;
	} else {
		return;
	}

	if (!renderer.hasOwnProperty("message")) {
		return;
	}

	timestamp = renderer["timestampUsec"];

	// On standard youtube chat, can't intercept the initial data directly,
	// so need to build up a data set linking timestamp/author combinations to emotes.
	// Only need to store this for the initial batch of messages.
	const simpleTimestamp = renderer.timestampText.simpleText;
	const authorName = renderer.authorName.simpleText;
	if (store) {
		if (!timestampNameData.hasOwnProperty(simpleTimestamp)) {
			timestampNameData[simpleTimestamp] = {}
		}
		timestampNameData[simpleTimestamp][authorName] = []
	}


	// The normal youtube chat window doesn't like it when the image url
	// is changed to moz-extension://.... so use base64 data instead.
	// The hyperchat window is fine with it, but the youtube javascript
	// does some processing on it that garbles the URL into an error message.
	if (renderer.hasOwnProperty("authorBadges")) {
		badge = renderer.authorBadges[0].liveChatAuthorBadgeRenderer;
		imageData = badgesData[badge.tooltip];
		// Have to clone this object back into the main window scope,
		// using the action as a reference to that scope.
		badge.customThumbnail.thumbnails = cloneInto([
			{
				"url": imageData,
				"width": 16,
				"height": 16
			}
		], action);
	}
	
	const emotes = decodeEmotes(chatData[timestamp]);
	for (const run of renderer.message.runs) {
		if (run.text == "□") {
			delete run["text"];
			emoteName = emotes.next().value;
			image = `emotes/${emoteName}.png`
			imageURL = browser.runtime.getURL(image);
			if (store) {
				timestampNameData[simpleTimestamp][authorName].push({"url": imageURL, name: emoteName});
			}
			run.emoji = cloneInto({
			  "image": {
				"thumbnails": [
				  {
					"url": imageURL,
					"width": 24,
					"height": 24
				  }
				],
				"accessibility": {
				  "accessibilityData": {
					"label": emoteName
				  }
				}
			  },
			  "isCustomEmoji": true
			}, action);
		}
	}
}

exportFunction(isFaunaArchive, window, {
	defineAs: "isFaunaArchive",
});

exportFunction(loadData, window, {
	defineAs: "faunaLoadData",
});

exportFunction(patchAction, window, {
	defineAs: "faunaPatchAction",
});

console.log("Loading fauna extension (isolated)");

