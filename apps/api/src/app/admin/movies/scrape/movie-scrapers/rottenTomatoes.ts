import { CheerioAPI } from "cheerio";
import appConfig from "../../../../../config/app";
import { ScrapeMovieData } from "../scrape-movie";
import { scrapeValidDateFormat } from "../utils";
import Scraper from "./scraper";

export class RottenTomatoesScraper extends Scraper<ScrapeMovieData> {
	source: { name: string; url: string } = {
		name: "Rotten Tomatoes",
		url: appConfig.movieWebsites.rottenTomatoesUrl,
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
		const ratingScoreString = $('rt-button[slot="criticsScore"]')
			.find("rt-text")
			.text()
			.slice(0, -1);

		return Number(ratingScoreString) / 10;
	}

	scrapeReleaseDate($: CheerioAPI): string {
		const dateString = $('rt-text:contains("Release Date (Theaters)")')
			.parent()
			.next()
			.find("rt-text")
			.text();
		return scrapeValidDateFormat(dateString);
	}

	scrapeMovieDirector($: CheerioAPI): string {
		return $('rt-text:contains("Director")')
			.parent()
			.next()
			.find("rt-link")
			.map(function (i, el) {
				// this === el
				return $(this).text();
			})
			.toArray()
			.join(",");
	}

	scrapeMovieRuntime($: CheerioAPI): string {
		return $('rt-text:contains("Runtime")')
			.parent()
			.next()
			.find("rt-text")
			.text();
	}

	scrapeMovieRating($: CheerioAPI): string {
		return $('rt-text:contains("Rating")')
			.parent()
			.next()
			.find("rt-text")
			.text();
	}

	scrapeSynopsis($: CheerioAPI): string {
		return $("div.synopsis-wrap").find("rt-text").last().text();
	}
}
