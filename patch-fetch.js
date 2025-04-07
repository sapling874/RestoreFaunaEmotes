const originalFetch = window.fetch;

window.fetch = async (...args) => {
	const request = args[0];
	const url = request.url;
	const result = await originalFetch(...args);

	if (url == "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat_replay?prettyPrint=false") {
		try {
			window.faunaLoadData(window.parent.location);
		} catch(err) {
			console.debug("ERROR NAME: ", err.name);
			console.debug("ERROR MESSAGE: ", err.message);
			console.debug("CAUGHT ERROR: ", err);
			throw err;
		}

		bodyJson = await (result.clone()).json();

		for (const action of bodyJson.continuationContents.liveChatContinuation.actions) {
			window.faunaPatchAction(action);
		}
		return new Response(JSON.stringify(bodyJson));
	}

	return result;
}

console.log("Loading fauna extension (patch fetch)");

window.faunaLoadData(window.parent.parent.location);

