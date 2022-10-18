import { Helper } from './../helpers/Helper';
import { Page, Browser } from 'puppeteer';
import { FloralScraper } from '../Scrapers/FloralScraper';
import * as cheerio from 'cheerio';

export class FloralQuery{
    
    async getData(page: Page, browser: Browser){
          await page.goto("https://www.instacart.ca/store/real-canadian-superstore/collections/floral");
          await Helper.waitTillHTMLRendered(page);
          await Helper.autoScroll(page);
          let scraper = new FloralScraper(cheerio.load(await page.content()), browser);
          await scraper.getProducts();
    }
}