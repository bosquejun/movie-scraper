import { CheerioAPI } from "cheerio";
import appConfig from "../../../../../config/app";
import { ScrapeMovieData } from "../scrape-movie";
import { scrapeValidDateFormat } from "../utils";
import Scraper from "./scraper";

export class MetaCriticScraper extends Scraper<ScrapeMovieData> {
	source: { name: string; url: string } = {
		name: "Meta Critic",
		url: appConfig.movieWebsites.metaCriticUrl,
	};

	public applyScrapingParser($: CheerioAPI): ScrapeMovieData {
		const releaseDate = this.scrapeReleaseDate($);
		const director = this.scrapeMovieDirector($);
		const movieRating = this.scrapeMovieRating($);
		const movieRuntime = this.scrapeMovieRuntime($);
		const posterImage = this.scrapePosterImage($);
		const ratingScore = this.scrapeRatingScore($);
		const synopsis = this.scrapeSynopsis($);

		return {
			ratingScore,
			source: this.source.name,
			url: this.url.href,
			posterImage,
			releaseDate,
			director,
			movieRating,
			movieRuntime,
			synopsis,
		};
	}

	scrapePosterImage($: CheerioAPI): string {
		const imgEl = $(
			'media-scorecard[data-mediascorecardmanager="mediaScorecard"]'
		).find("rt-img");
		const imgAttributes = imgEl.attr();
		if (!imgAttributes) return "";
		return imgAttributes.src;
	}

	scrapeRatingScore($: CheerioAPI): number {
		const ratingScoreString = $("div.c-productScoreInfo_scoreNumber")
			.first()
			.text();

		return Number(ratingScoreString) / 10;
	}

	scrapeReleaseDate($: CheerioAPI): string {
		const dateString = $("div.c-movieDetails")
			.children()
			.eq(1)
			.children()
			.last()
			.text();
		return scrapeValidDateFormat(dateString);
	}

	scrapeMovieDirector($: CheerioAPI): string {
		return $("div.c-productDetails_staff_directors")
			.first()
			.find("a")
			.text()
			.replace(/\s+/g, " ")
			.trim();
	}

	scrapeMovieRuntime($: CheerioAPI): string {
		return $("div.c-movieDetails")
			.children()
			.eq(2)
			.children()
			.last()
			.text();
	}

	scrapeMovieRating($: CheerioAPI): string {
		return $("div.c-movieDetails")
			.children()
			.eq(3)
			.children()
			.last()
			.text();
	}

	scrapeSynopsis($: CheerioAPI): string {
		return $("span.c-productDetails_description").first().text();
	}
}
