import { Helper } from '../helpers/Helper';
import { Browser } from 'puppeteer';
import { Page } from 'puppeteer';
import * as cheerio from 'cheerio';

export class Scraper{

    public $!: cheerio.Root;
    public browser: Browser;
    public category: string;

    constructor(pagina: cheerio.Root, browser: Browser, category: string) {
        this.$ = pagina;
        this.browser = browser;
        this.category = category;
    }

    async getProducts(){
        let products = this.$(".css-z4hfda").eq(0).find(".css-1bfgc1k").eq(0).find('.css-1381xmv-ItemsGridWithPostAtcRecommendations').eq(0).find('ul').eq(0).find('li');
        let productsArray = products.toArray();
        console.log(products.length);
        let data: any[] = [];
        const fs = require('fs');
        for(const i of productsArray.keys()){
            let newPage = await this.browser.newPage();
            let url = products.eq(i).find(".css-1pc1srv-ItemCardHoverProvider").eq(0).find("a").first().attr('href')?.toString()!;
            await newPage.goto('https://instacart.ca' + url);
            await Helper.waitTillHTMLRendered(newPage);
            let $2 = cheerio.load(await newPage.content());

            let obj = {
                Name: $2(".css-16ptqna").eq(0).text(),
                Price: $2(".css-1u4ofbf").eq(0).find('span').eq(0).text(),
                Details: $2(".css-kxnfom").eq(0).text(),
                Image: $2(".ic-image-zoomer").eq(0).find('img').eq(0).attr('src')?.toString()!,
                Category: this.category
            }
            data.push(obj);
            newPage.close();
        }
        fs.appendFile('./output.json',  JSON.stringify(data), function (err:any) {
            if (err) throw err;
          });
        return data;
    }
}