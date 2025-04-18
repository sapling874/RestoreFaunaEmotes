const faunaExtensionId = "flhcccabjfcbgidalgkimgfggalganaa";

const videoId = window.parent.ytInitialData.currentVideoEndpoint.watchEndpoint.videoId;

if (faunaVideoIds.includes(videoId)) {
	console.log("Initialising Fauna extension");
	const originalFetch = window.fetch;

	window.fetch = async (...args) => {
		const request = args[0];
		const url = request.url;
		const result = await originalFetch(...args);

		if (url == "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat_replay?prettyPrint=false") {
			bodyJson = await (result.clone()).json();

			patchedActions = await chrome.runtime.sendMessage(faunaExtensionId, {
				"action": "patchActions",
				"videoId": videoId,
				"actions": bodyJson.continuationContents.liveChatContinuation.actions
			});

			bodyJson.continuationContents.liveChatContinuation.actions = patchedActions;

			return new Response(JSON.stringify(bodyJson));
		}
		return result;
	}
} else {
	console.debug(`Video ${videoId} is not a Fauna archive, not initialising`);
}
