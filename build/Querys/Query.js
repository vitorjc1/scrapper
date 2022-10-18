"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const FloralQuery_1 = require("./FloralQuery");
const Helper_1 = require("./../helpers/Helper");
class Query {
    constructor() {
        this.floralQuery = new FloralQuery_1.FloralQuery();
    }
    async start(page) {
        await page.goto("https://www.instacart.ca/store/real-canadian-superstore/storefront");
        await Helper_1.Helper.waitTillHTMLRendered(page);
        if (await page.$("#streetAddress") !== null) {
            await page.type("#streetAddress", "850 11 Street SW");
            await Helper_1.Helper.waitTillHTMLRendered(page);
            await Helper_1.Helper.sleep(2000);
            await page.click(".css-y9wxcl-AddressSuggestionList > li:nth-child(1) > div", { delay: 400 });
            await Helper_1.Helper.waitTillHTMLRendered(page);
            await Helper_1.Helper.sleep(1000);
            // await page.click("#id-3 > div.css-1hudhoo > div.css-1rvobel > div.css-9s0vmu-UserAddressManager > form > button", { delay: 300 });
            await page.click(".css-1ohhyoe", { delay: 300 });
            await Helper_1.Helper.sleep(2000);
        }
    }
}
exports.Query = Query;
