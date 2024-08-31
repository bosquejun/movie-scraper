import { ApiError } from "@comeback/errors";
import appConfig from "../../../../../config/app";
import { ScrapeMovieData } from "../scrape-movie";
import { ImDbScraper } from "./imdb";
import { MetaCriticScraper } from "./metaCritic";
import { RottenTomatoesScraper } from "./rottenTomatoes";
import Scrapper from "./scraper";

export async function getScrapedMovie(
	urls: string[],
	callback?: (movieData: ScrapeMovieData) => void
) {
	async function scrapeNow(url: string) {
		const _url = new URL(url);

		let scrapper: Scrapper<ScrapeMovieData>;

		switch (_url.hostname) {
			case new URL(appConfig.movieWebsites.imdbRatingUrl).hostname:
				scrapper = new ImDbScraper(_url);
				break;
			case new URL(appConfig.movieWebsites.rottenTomatoesUrl).hostname:
				scrapper = new RottenTomatoesScraper(_url);
				break;
			case new URL(appConfig.movieWebsites.metaCriticUrl).hostname:
				scrapper = new MetaCriticScraper(_url);
				break;
			default:
				throw new ApiError(
					"scraping_source_not_supported",
					`Source website '${_url.hostname}' not supported for scraping.`
				);
		}

		return scrapper.scrape(callback);
	}

	if (callback) {
		for (const url of urls) {
			scrapeNow(url);
		}
	}

	return await Promise.all(urls.map(async (url) => scrapeNow(url)));
}
