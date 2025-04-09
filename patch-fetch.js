const videoId = window.parent.ytInitialData.currentVideoEndpoint.watchEndpoint.videoId;

if (window.isFaunaArchive(videoId)) {
	console.log("Initialising Fauna extension");

	const originalFetch = window.fetch;

	window.fetch = async (...args) => {
		const request = args[0];
		const url = request.url;
		const result = await originalFetch(...args);

		if (url == "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat_replay?prettyPrint=false") {
			bodyJson = await (result.clone()).json();

			for (const action of bodyJson.continuationContents.liveChatContinuation.actions) {
				window.faunaPatchAction(action);
			}
			return new Response(JSON.stringify(bodyJson));
		}

		return result;
	}

	console.log("Loading fauna extension (patch fetch)");

	window.faunaLoadData(videoId);
} else {
	console.debug(`Video ${videoId} is not a Fauna archive, not initialising`);
}
