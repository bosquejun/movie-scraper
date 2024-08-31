import { CheerioAPI } from "cheerio";
import appConfig from "../../../../../config/app";
import { ScrapeMovieData } from "../scrape-movie";
import { scrapeValidDateFormat } from "../utils";
import Scraper from "./scraper";

export class ImDbScraper extends Scraper<ScrapeMovieData> {
	source: { name: string; url: string } = {
		name: "IMDb",
		url: appConfig.movieWebsites.imdbRatingUrl,
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
		return (
			$('div[data-testid="hero-media__poster"]').find("img").get(0)
				?.attribs?.src || ""
		);
	}

	scrapeSynopsis($: CheerioAPI): string {
		return $('p[data-testid="plot"]').text();
	}

	scrapeRatingScore($: CheerioAPI): number {
		const ratingScoreString = $(
			'div[data-testid="hero-rating-bar__aggregate-rating__score"]'
		)
			.first()
			.children()
			.first()
			.text();

		return Number(ratingScoreString);
	}

	scrapeReleaseDate($: CheerioAPI): string {
		const releaseDateEl = $(
			'li[data-testid="title-details-releasedate"]'
		).find("a");
		if (!releaseDateEl.length) return "";
		const textEl = releaseDateEl.eq(1)?.first();
		return scrapeValidDateFormat(textEl.text());
	}

	scrapeMovieDirector($: CheerioAPI): string {
		const linkEl = $('section[cel_widget_id="StaticFeature_Cast"]').find(
			'a[class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]'
		);
		return linkEl.eq(0).first().text();
	}

	scrapeMovieRuntime($: CheerioAPI): string {
		return $('h1[data-testid="hero__pageTitle"]')
			.next()
			.children()
			.last()
			.text();
	}

	scrapeMovieRating($: CheerioAPI): string {
		return $('h1[data-testid="hero__pageTitle"]')
			.next()
			.find("a")
			.last()
			.text();
	}
}
