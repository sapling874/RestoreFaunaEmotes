function patchMessage(message, chatData, initialDataStore, isInitialData) {
	const action = message.replayChatItemAction.actions[0]

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
	if (isInitialData) {
		if (!initialDataStore.hasOwnProperty(simpleTimestamp)) {
			initialDataStore[simpleTimestamp] = {}
		}
		initialDataStore[simpleTimestamp][authorName] = []
	}

	// The normal youtube chat window doesn't like it when the image url
	// is changed to moz-extension://.... so use base64 data instead.
	// The hyperchat window is fine with it, but the youtube javascript
	// does some processing on it that garbles the URL into an error message.
	if (renderer.hasOwnProperty("authorBadges")) {
		badge = renderer.authorBadges[0].liveChatAuthorBadgeRenderer;
		imageData = badgesData[badge.tooltip];
		badge.customThumbnail.thumbnails = [
			{
				"url": imageData,
				"width": 16,
				"height": 16
			}
		];
	}

	const emotes = decodeEmotes(chatData[timestamp]);
	for (const run of renderer.message.runs) {
		if (run.text == "□") {
			delete run["text"];
			emoteName = emotes.next().value;
			image = `emotes/${emoteName}.png`
			imageURL = chrome.runtime.getURL(image);
			if (isInitialData) {
				initialDataStore[simpleTimestamp][authorName].push({"url": imageURL, name: emoteName});
			}
			run.emoji = {
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
			};
		}
	}
}
