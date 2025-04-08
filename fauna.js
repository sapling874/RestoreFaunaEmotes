var disabled;
var chatData;
var chatDataLoaded = false;

function getVideoID(loc) {
	if (loc.pathname == "/watch") {
		params = new URLSearchParams(loc.search);
		return params.get("v");
	}
}

async function loadData(url) {
	if (disabled || chatDataLoaded) {
		return;
	}

	videoID = getVideoID(url);
	fileLocation = browser.runtime.getURL(`chat_data/${videoID}.json.gz`);

	ds = new DecompressionStream("gzip");
	data = await fetch(fileLocation);
	blob = await data.blob();
	streamData = blob.stream().pipeThrough(ds);
	jsonData = await new Response(streamData).json();
	chatData = jsonData;

	console.debug("Loaded chat data for video ID: ", videoID);
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
			patchAction(action);
		}
		const newScript = document.createElement("script");
		stringData = JSON.stringify(initialData);
		newScript.text = `${start}${stringData};`;
		document.querySelector("body").querySelectorAll("script")[i].replaceWith(newScript);
	}
}

function patchAction(action) {
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

