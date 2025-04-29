// Takes an input badge image URL like
// https://yt3.ggpht.com/e_78jH528L_TtxMB64FO8dAo78jfMfsuanok8j9c9PLtXBMnMsY4aPEkB8aPSLA3JyeM_1VkRqvqX-zE=s32-c-k
// and returns the part after the ".com/" and before the "=s".
function getBadgeIdFromUrl(url) {
	return url.split("=s")[0].split("/").pop();
}

function getBadgeId(badgeRenderer) {
	// Verified users have badges but not custom ones.
	if (badgeRenderer.hasOwnProperty("customThumbnail")) {
		return getBadgeIdFromUrl(badgeRenderer.customThumbnail.thumbnails[0].url);
	}
}

