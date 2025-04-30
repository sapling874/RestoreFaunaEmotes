// On standard youtube chat, intercepting intercept the initial data
// doesn't work. Instead, need to observe elements as
// they are being added to the chat window and replace
// the squares with images in the document.

function replaceBadge(node) {
	if (!node) {
		return;
	}
	badge = node.querySelector("yt-live-chat-author-chip > #chat-badges > yt-live-chat-author-badge-renderer > #image > img");
	if (badge) {
		if (badge.src.startsWith("data:img/png")) {
			// Reparsing an already replaced badge.
			// Happens when quickly scrubbing back to the start of a stream.
			// Don't need to do anything.
			return;
		}
		badgeId = getBadgeIdFromUrl(badge.src);
		if (badgeId) {
			badge.src = badgesData[badgeId];
		}
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
