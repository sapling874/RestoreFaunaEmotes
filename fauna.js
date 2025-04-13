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

function patchAction(action, store) {
	if (disabled == true || chatData === undefined) {
		return;
	}

	if (action.hasOwnProperty("wrappedJSObject")) {
		// Objects passed from main window code have a
		// read only wrapper around them. Discard it.
		action = action.wrappedJSObject;
	}

	if (action.replayChatItemAction === undefined) {
		return;
	}
	if (action.replayChatItemAction.actions[0] === undefined) {
		return;
	}
	if (action.replayChatItemAction.actions[0].addChatItemAction === undefined) {
		return;
	}
	if (action.replayChatItemAction.actions[0].addChatItemAction.item === undefined) {
		return;
	}
	if (action.replayChatItemAction.actions[0].addChatItemAction.item.liveChatTextMessageRenderer === undefined) {
		return;
	}

	renderer = action.replayChatItemAction.actions[0].addChatItemAction.item.liveChatTextMessageRenderer;
	timestamp = renderer["timestampUsec"]

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


	// Disabling this for now as the normal youtube chat window doesn't
	// like it when the image url is changed to moz-extension://....
	// The hyperchat window is fine with it, but the youtube javascript
	// must do some processing on it that garbles it into an error message.
	// For now, youtube is still serving the member badges so will leave this in.
	// When it comes to it, can set the image as base64 data directly in the src
	// and that works for both chat windows.
	// if ("authorBadges" in renderer) {
	// 	badge = renderer.authorBadges[0].liveChatAuthorBadgeRenderer;
	// 	mapping = {
	// 		"New member": "badges/new.png",
	// 		"Member (1 month)": "badges/1month.png",
	// 		"Member (2 months)": "badges/2months.png",
	// 		"Member (6 months)": "badges/6months.png",
	// 		"Member (1 year)": "badges/1year.png",
	// 		"Member (2 years)": "badges/2years.png"
	// 		"Member (3 years)": "badges/3years.png"
	// 	};
	// 	image = mapping[badge.tooltip];
	// 	// Have to clone this object back into the main window scope,
	// 	// using the action as a reference to that scope.
	// 	badge.customThumbnail.thumbnails = cloneInto([
	// 		{
	// 			"url": browser.runtime.getURL(image),
	// 			"width": 16,
	// 			"height": 16
	// 		}
	// 	], action);
	// }
	
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

function replaceMessageEmotes(node) {
	const content = node.querySelector("#content");
	const timestamp = content.querySelector("#timestamp").textContent;
	const authorName = content.querySelector("yt-live-chat-author-chip").querySelector("#author-name").textContent;
	const message = content.querySelector("#message");

	if (!timestampNameData.hasOwnProperty(timestamp)) {
		// All the initial emotes have been displayed.
		// Return false here to signal that the observer
		// can be disconnected.
		return false;
	}
	// Look up the emotes by the timestamp, and author name.
	const emoteData = timestampNameData[timestamp][authorName];

	var index = 0;
	for (const run of message.childNodes) {
		if (run.textContent == "□") {
			// Replace each square in the message
			// with the corresponding emote.
			const emote = emoteData[index];
			if (!emote) {
				continue;
			}
			newImg = document.createElement("img");
			newImg.classList.add("emoji");
			newImg.classList.add("style-scope");
			newImg.classList.add("yt-formatted-string")
			newImg.classList.add("yt-live-chat-text-message-renderer");
			newImg.src = emote.url;
			newImg.alt = emote.name;
			run.replaceWith(newImg);
			index += 1;
		}
	}
	return true;
}

chatItemsList = document.getElementById("items");
if (chatItemsList) {
	// Standard youtube chat, not HyperChat.
	// Replacing the ytInitialData script doesn't
	// work for this, so need to watch each message
	// coming in and replace its contents directly.
	const observeConfig = {childList: true, attributes: false, subtree: false};
	const callback = (mutationList, observer) => {
		for (const mutation of mutationList) {
			// Loop over the new nodes added to the chat box div.
			for (const addedNode of mutation.addedNodes) {
				if (addedNode.nodeName == "YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER") {
					keepGoing = replaceMessageEmotes(addedNode);
					if (!keepGoing) {
						// All initial messages have been added to the chat box,
						// disconnect the observer as it isn't needed anymore.
						observer.disconnect();
					}
				}
			}
		}
	}
	const observer = new MutationObserver(callback);
	observer.observe(chatItemsList, observeConfig);
}

console.log("Loading fauna extension (isolated)");

