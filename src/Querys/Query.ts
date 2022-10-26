import { Scraper } from './../Scrapers/Scraper';
import { Helper } from './../helpers/Helper';
import { Page, Browser } from 'puppeteer';
import * as cheerio from 'cheerio';

export class Query{

    public async start(page: Page){
        await page.goto("https://www.instacart.ca/store/real-canadian-superstore/storefront");
        if (await page.$("#streetAddress") !== null){
            await page.type("#streetAddress","850 11 Street SW");
            await Helper.waitTillHTMLRendered(page);  
            await Helper.sleep(2000);          
            await page.click(".css-y9wxcl-AddressSuggestionList > li:nth-child(1) > div", { delay:400 });
            await Helper.waitTillHTMLRendered(page);
            await Helper.sleep(1000);
            await page.click(".css-1ohhyoe", { delay: 300 });
            await Helper.sleep(2000);
          }
    }

    async getData(page: Page, browser: Browser, url:string, category:string){
        await page.goto(url);
        await Helper.waitTillHTMLRendered(page);
        await Helper.autoScroll(page);
        let scraper = new Scraper(cheerio.load(await page.content()), browser, category);
        await scraper.getProducts();
  }
  
}