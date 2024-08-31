import { ApiError } from "@comeback/errors";
import { ApiClient } from "@comeback/utils";
import robotsParser from "robots-parser";

export default function applyRespectfulScraping<TRequest, TResponse>(
	apiClient: ApiClient,
	userAgentName = "test-scraper-bot"
) {
	// fetch website's robots.txt information
	const websiteRobotsTxtUrl = new URL("/robots.txt", apiClient.baseURL).href;

	async function getRobotsTxt() {
		const robotsTxtResponse =
			await apiClient.get<string>(websiteRobotsTxtUrl);

		// parse robots.txt file for rules validation
		return robotsParser(websiteRobotsTxtUrl, robotsTxtResponse);
	}

	return async (endpoint: string) => {
		try {
			const robots = await getRobotsTxt();

			const scrapeUrl = new URL(endpoint, apiClient.baseURL).href;

			if (!robots.isAllowed(scrapeUrl, userAgentName)) {
				throw new Error(
					"Provided link is not allowed to scrape from the source"
				);
			}

			const crawlDelay = robots.getCrawlDelay(userAgentName) || 0; // Default to 1 second

			console.log(
				`Scraping is allowed for ${scrapeUrl}. Respecting crawl delay of ${crawlDelay} ms`
			);

			// Step 4: Respect the crawl delay
			await new Promise((resolve) => setTimeout(resolve, crawlDelay));

			// Step 5: Make the request to scrape the page
			const scrapeResponse = await apiClient.get<any>(scrapeUrl, {
				headers: {
					"User-Agent": userAgentName,
					"Accept-Language": "en-US,en;q=0.9",
					"Accept-Encoding": "gzip, deflate, br",
				},
			});
			return scrapeResponse;
		} catch (error) {
			const { message } = error as Error;
			throw new ApiError("scraping_not_allowed", message);
		}
	};
}
