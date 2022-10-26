"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const Scraper_1 = require("./../Scrapers/Scraper");
const Helper_1 = require("./../helpers/Helper");
const cheerio = __importStar(require("cheerio"));
class Query {
    async start(page) {
        await page.goto("https://www.instacart.ca/store/real-canadian-superstore/storefront");
        if (await page.$("#streetAddress") !== null) {
            await page.type("#streetAddress", "850 11 Street SW");
            await Helper_1.Helper.waitTillHTMLRendered(page);
            await Helper_1.Helper.sleep(2000);
            await page.click(".css-y9wxcl-AddressSuggestionList > li:nth-child(1) > div", { delay: 400 });
            await Helper_1.Helper.waitTillHTMLRendered(page);
            await Helper_1.Helper.sleep(1000);
            await page.click(".css-1ohhyoe", { delay: 300 });
            await Helper_1.Helper.sleep(2000);
        }
    }
    async getData(page, browser, url, category) {
        await page.goto(url);
        await Helper_1.Helper.waitTillHTMLRendered(page);
        await Helper_1.Helper.autoScroll(page);
        let scraper = new Scraper_1.Scraper(cheerio.load(await page.content()), browser, category);
        await scraper.getProducts();
    }
}
exports.Query = Query;
