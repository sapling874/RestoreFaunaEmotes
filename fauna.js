var disabled;
var chatData;
var chatDataLoaded = false;

function getVideoID(loc) {
	if (loc.pathname == "/watch") {
		params = new URLSearchParams(loc.search);
		return params.get("v");
	}
}

function loadData(url) {
	if (disabled || chatDataLoaded) {
		return;
	}

	videoID = getVideoID(url);
	fileLocation = browser.runtime.getURL(`chat_data/${videoID}.json`);

	// Can't do this using fetch or as an asynchronous request.
	// To do that, this request would need to be marked async,
	// and that breaks the function return as the main window
	// script hits a permission error on the returned Promise.
	// At least that is what I think is happening.
	try {
		xhr = new XMLHttpRequest();
		xhr.open("GET", fileLocation, false);
		xhr.send();
	} catch (err) {
		if (err.name == "NetworkError") {
			// File not found, disable for this video.
			console.debug("Disabling");
			disabled = true;
			return
		}
		// Unknown, throw it.
		throw err;
	}
	chatData = JSON.parse(xhr.responseText);

	console.debug("Loaded chat data for video ID: ", videoID);
	console.debug("Loaded from file location ", fileLocation);

	chatDataLoaded = true;
	return;
}

function patchAction(action) {
	if (disabled == true || chatData === undefined) {
		return;
	}

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
	timestamp = renderer["timestampUsec"]

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
	
	var index = 0;
	for (const run of renderer.message.runs) {
		if (run.text == "□") {
			delete run["text"];
			emoteName = chatData[timestamp][index];
			image = `emotes/${emoteName}.png`
			run.emoji = cloneInto({
			  "image": {
				"thumbnails": [
				  {
					"url": browser.runtime.getURL(image),
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
			index += 1;
		}
	}
}

exportFunction(loadData, window, {
	defineAs: "faunaLoadData",
});

exportFunction(patchAction, window, {
	defineAs: "faunaPatchAction",
});

console.log("Loading fauna extension (isolated)");

