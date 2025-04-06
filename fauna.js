function patchAction(action) {
	// Isolated extension code can't modify object that comes
	// from main window script, need to clone it and return the copy.
	//action = structuredClone(action);
	action = action.wrappedJSObject;

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
	if ("authorBadges" in renderer) {
		badge = renderer.authorBadges[0].liveChatAuthorBadgeRenderer;
		mapping = {
			"New member": "badges/new.png",
			"Member (1 month)": "badges/1month.png",
			"Member (2 months)": "badges/2months.png",
			"Member (6 months)": "badges/6months.png",
			"Member (1 year)": "badges/1year.png",
			"Member (2 years)": "badges/2years.png",
			"Member (3 years)": "badges/2years.png"
		};
		image = mapping[badge.tooltip];
		// Have to clone this object back into the main window scope,
		// using the action as a reference to that scope.
		badge.customThumbnail.thumbnails = cloneInto([
			{
				"url": browser.runtime.getURL(image),
				"width": 16,
				"height": 16
			}
		], action);
	}
	
	for (const run of renderer.message.runs) {
		if (run.text == "□") {
			delete run["text"];
			run.emoji = cloneInto({
			  "image": {
				"thumbnails": [
				  {
					"url": browser.runtime.getURL("emotes/love.png"),
					"width": 24,
					"height": 24
				  },
				  {
					"url": browser.runtime.getURL("emotes/comfy.png"),
					"width": 48,
					"height": 48
				  }
				],
				"accessibility": {
				  "accessibilityData": {
					"label": "love"
				  }
				}
			  },
			  "isCustomEmoji": true	
			}, action);
		}
	}
}

exportFunction(patchAction, window, {
	defineAs: "faunaPatchAction",
});

console.log("Loading fauna extension (isolated)");

