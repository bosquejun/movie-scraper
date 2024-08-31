import { TAnyHash } from "@comeback/types";
import { createApiClient } from "@comeback/utils";
import * as cheerio from "cheerio";
import applyRespectfulScraping from "../apply-respectful-scraping";

export default abstract class Scraper<TScrapedDataObject = TAnyHash> {
	constructor(public readonly url: URL) {}

	public async scrape(cb?: (movieData: TScrapedDataObject) => void) {
		const apiClient = createApiClient(this.url.origin);

		const scrapeWebsite = applyRespectfulScraping(apiClient);

		if (cb) {
			scrapeWebsite(this.url.pathname)
				.then((response) => {
					cb(this.applyScrapingParser(cheerio.load(response)));
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			const websiteData = await scrapeWebsite(this.url.pathname);
			return this.applyScrapingParser(cheerio.load(websiteData));
		}
	}

	protected abstract applyScrapingParser(
		$: cheerio.CheerioAPI
	): TScrapedDataObject;

	abstract source: {
		name: string;
		url: string;
	};

	abstract scrapeReleaseDate($: cheerio.CheerioAPI): string;
	abstract scrapeMovieDirector($: cheerio.CheerioAPI): string;
	abstract scrapeMovieRating($: cheerio.CheerioAPI): string;
	abstract scrapeMovieRuntime($: cheerio.CheerioAPI): string;
	abstract scrapePosterImage($: cheerio.CheerioAPI): string;
	abstract scrapeSynopsis($: cheerio.CheerioAPI): string;
	abstract scrapeRatingScore($: cheerio.CheerioAPI): number;
}
