import { Helper } from '../helpers/Helper';
import { Browser } from 'puppeteer';
import { Page } from 'puppeteer';
import * as cheerio from 'cheerio';

export class FloralScraper{

    public $!: cheerio.Root;
    public browser: Browser;
    constructor(pagina: cheerio.Root, browser: Browser) {
        this.$ = pagina;
        this.browser = browser;
    }

    async getProducts(){
        let products = this.$(".css-z4hfda").children('div').last().children('div').last().find('.css-1381xmv-ItemsGridWithPostAtcRecommendations').eq(0).find('ul').eq(0).find('li');
        let productsArray = products.toArray();
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
                Category: 'Floral'
            }
            data.push(obj);
            newPage.close();
        }
        fs.writeFileSync('./output.json', JSON.stringify(data));
        return data;
    }

    public async getImageBase64(imageURL: string){
        let imagePage = await this.browser.newPage();
        await imagePage.goto(imageURL);
        const imageBase64 = await imagePage.screenshot({ encoding: "base64" });

        await imagePage.close();

        return imageBase64;
    }

}