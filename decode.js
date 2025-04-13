const encoding = {
	0:  "lol",
	1:  "love",
	2:  "clover",
	3:  "flushed",
	4:  "yay",
	5:  "dead",
	6:  "yandere",
	7:  "noo",
	8:  "cry",
	9:  "comfy",
	10: "zoom",
	11: "hugsnail",
	12: "bald",
	13: "wide1",
	14: "wide2",
	15: "wide3",
	16: "UUU",
	17: "UUUU",
	18: "slap",
	19: "wave",
	20: "shy",
	21: "disgust",
	22: "pien",
	23: "angry",
	24: "smug",
	25: "tako",
	26: "smile",
	27: "bonk",
	28: "innocent",
	29: "sleep",
	30: "nemusmug",
	31: "doki",
	32: "pinklight",
	33: "greenlight",

	40: ["wide1", "wide2", "wide3"],
	41: ["pinklight", "yay", "greenlight"],
	42: ["pinklight", "love", "greenlight"],
	43: ["pinklight", "lol", "greenlight"],
}

function* decodeEmotes(emotes) {
	if (typeof emotes === "number") {
		emotes = encoding[emotes];
	}

	if (typeof emotes === "string") {
		// Message uses all of the same emote.
		// Encoded message could have had any number of them,
		// so yield as many as needed.
		while (true) {
			yield emotes;
		}
	}

	if (Array.isArray(emotes)) {
		// Either message was not encoded, or was
		// encoded to one of the known multi-emote messages.
		// Yield each emote in turn.
		for (const emote of emotes) {
			yield emote;
		}
	}
}
