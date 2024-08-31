export function isSourceUrlAllowed(
	sourceHostname: string,
	supportedUrls: string[]
) {
	const isAllowed = supportedUrls.some(
		(sUrl) => new URL(sUrl).hostname === sourceHostname
	);

	return isAllowed;
}

const dateRegex = /^([A-Za-z]+ \d{1,2}, \d{4})/;
export function scrapeValidDateFormat(rawDateString?: string) {
	if (!rawDateString) return "";
	const matched = rawDateString.match(dateRegex);
	return matched?.shift() || "";
}
