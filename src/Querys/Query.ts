import { FloralQuery } from './FloralQuery';
import { Helper } from './../helpers/Helper';
import { Page } from 'puppeteer';
export class Query{

    public floralQuery!: FloralQuery;

    constructor(){
        this.floralQuery = new FloralQuery();
    }

    public async start(page: Page){
        await page.goto("https://www.instacart.ca/store/real-canadian-superstore/storefront");
        await Helper.waitTillHTMLRendered(page);
        if (await page.$("#streetAddress") !== null){
            await page.type("#streetAddress","850 11 Street SW");
            await Helper.waitTillHTMLRendered(page);  
            await Helper.sleep(2000);          
            await page.click(".css-y9wxcl-AddressSuggestionList > li:nth-child(1) > div", { delay:400 });
            await Helper.waitTillHTMLRendered(page);
            await Helper.sleep(1000);
            // await page.click("#id-3 > div.css-1hudhoo > div.css-1rvobel > div.css-9s0vmu-UserAddressManager > form > button", { delay: 300 });
            await page.click(".css-1ohhyoe", { delay: 300 });
            await Helper.sleep(2000);
          }
    }
}