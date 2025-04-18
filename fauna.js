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

function replaceBadge(node) {
	if (!node) {
		return;
	}
	badge = node.querySelector("yt-live-chat-author-chip > #chat-badges > yt-live-chat-author-badge-renderer > #image > img");
	if (badge) {
		badge.src = badgesData[badge.alt];
	}
}

function replaceMessageEmotes(node, isMemberchat, isSuperchat) {
	const isNormalMessage = (!isMemberchat && !isSuperchat);
	var timestamp;
	var authorName;
	var message;
	if (isMemberchat) {
		const card = node.querySelector("#card");
		const header = card.querySelector("#header").querySelector("#header-content");
		timestamp = header.querySelector("#timestamp").textContent;
		authorBox = header.querySelector("#header-content-primary-column > #header-content-inner-column > yt-live-chat-author-chip");
		authorName = authorBox.querySelector("#author-name").textContent;
		message = card.querySelector("#content > #message");

		replaceBadge(authorBox.querySelector("#chat-badges"));
	} else if (isSuperchat) {
		const card = node.querySelector("#card");
		const header = card.querySelector("#header").querySelector("#header-content");
		timestamp = header.querySelector("#timestamp").textContent;
		authorBox = header.querySelector("#header-content-primary-column > #single-line > #author-name-chip > yt-live-chat-author-chip");
		authorName = authorBox.querySelector("#author-name").textContent;
		message = card.querySelector("#content > #message");

		replaceBadge(authorBox);
	} else {
		const content = node.querySelector("#content");
		timestamp = content.querySelector("#timestamp").textContent;
		authorName = content.querySelector("yt-live-chat-author-chip").querySelector("#author-name").textContent;
		message = content.querySelector("#message");

		replaceBadge(content);
	}

	if (!timestampNameData.hasOwnProperty(timestamp)) {
		if (isNormalMessage) {
			// If a normal message isn't in the initial data,
			// then all the initial emotes have been displayed.
			// Return false to signal that the observer can
			// be disconnected.
			return false;
		}
		// Things like joining membership messages aren't in
		// the initial data, so continue on those.
		return true;
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
			if (isMemberchat) {
				newImg.classList.add("yt-live-chat-membership-item-renderer");
			} else if (isSuperchat) {
				newImg.classList.add("yt-live-chat-paid-message-renderer");
			} else {
				newImg.classList.add("yt-live-chat-text-message-renderer");
			}
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
				var keepGoing = true;
				if (addedNode.nodeName == "YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER") {
					keepGoing = replaceMessageEmotes(addedNode);
				} else if (addedNode.nodeName == "YT-LIVE-CHAT-MEMBERSHIP-ITEM-RENDERER") {
					keepGoing = replaceMessageEmotes(addedNode, true, false);
				} else if (addedNode.nodeName == "YT-LIVE-CHAT-PAID-MESSAGE-RENDERER") {
					keepGoing = replaceMessageEmotes(addedNode, false, true);
				} else if (addedNode.nodeName == "YT-LIVE-CHAT-PAID-STICKER-RENDERER") {
					replaceBadge(addedNode.querySelector("#card > #author-info > #content > #content-primary-column > #author-name-chip"));
				} else if (addedNode.nodeName == "YTD-SPONSORSHIPS-LIVE-CHAT-GIFT-PURCHASE-ANNOUNCEMENT-RENDERER") {
					replaceBadge(addedNode.querySelector("#header > #header > #content > #header-content > #header-content-primary-column > #header-content-inner-column"));
				}
				if (!keepGoing) {
					// All initial messages have been added to the chat box,
					// disconnect the observer as it isn't needed anymore.
					observer.disconnect();
				}
			}
		}
	}
	const observer = new MutationObserver(callback);
	observer.observe(chatItemsList, observeConfig);
}

console.log("Loading fauna extension (isolated)");

