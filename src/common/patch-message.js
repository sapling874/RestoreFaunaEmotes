function patchMessage(message, chatData, initialDataStore, isInitialData) {
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
	} else if (item.hasOwnProperty("liveChatSponsorshipsGiftPurchaseAnnouncementRenderer")) {
		// Gifted membership message.
		// Only need to replace the badge, but the data is in a different place.
		renderer = item.liveChatSponsorshipsGiftPurchaseAnnouncementRenderer;
		if (!renderer.header.liveChatSponsorshipsHeaderRenderer.hasOwnProperty("authorBadges")) {
			// Not sure how, but is is possible that some member gift messages don't
			// have their own membership badge. urMWdWlzDCw at stream start for example.
			return;
		}
		badge = renderer.header.liveChatSponsorshipsHeaderRenderer.authorBadges[0].liveChatAuthorBadgeRenderer;
		badgeId = getBadgeId(badge);
		if (badgeId) {
			imageData = badgesData[badgeId];
			badge.customThumbnail.thumbnails = [
				{
					"url": imageData,
					"width": 16,
					"height": 16
				}
			];
		}
		return;
	} else {
		return;
	}

	// The normal youtube chat window doesn't like it when the image url
	// is changed to moz-extension://.... so use base64 data instead.
	// The hyperchat window is fine with it, but the youtube javascript
	// does some processing on it that garbles the URL into an error message.
	if (renderer.hasOwnProperty("authorBadges")) {
		badge = renderer.authorBadges[0].liveChatAuthorBadgeRenderer;
		badgeId = getBadgeId(badge);
		if (badgeId) {
			imageData = badgesData[badgeId];
			badge.customThumbnail.thumbnails = [
				{
					"url": imageData,
					"width": 16,
					"height": 16
				}
			];
		}
	}

	if (!renderer.hasOwnProperty("message")) {
		return;
	}

	timestamp = renderer["timestampUsec"];
	id = renderer["id"];

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

	var emoteData;
	if (chatData.collisions.hasOwnProperty(timestamp)) {
		emoteData = chatData.collisions[timestamp][id];
	} else {
		emoteData = chatData.messages[timestamp];
	}

	const emotes = decodeEmotes(emoteData);
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
