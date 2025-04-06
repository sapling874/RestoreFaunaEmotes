const originalFetch = window.fetch;

window.fetch = async (...args) => {
	const request = args[0];
	const url = request.url;
	const result = await originalFetch(...args);

	if (url == "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat_replay?prettyPrint=false") {
		console.debug("Request for ", url);
		console.debug("Response: ", result);
		bodyJson = await (result.clone()).json();

		for (const action of bodyJson.continuationContents.liveChatContinuation.actions) {
			window.faunaPatchAction(action);
		}
		return new Response(JSON.stringify(bodyJson));
	}

	return result;
}

console.log("Loading fauna extension (patch fetch)");

