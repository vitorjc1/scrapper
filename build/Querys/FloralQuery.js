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
exports.FloralQuery = void 0;
const Helper_1 = require("./../helpers/Helper");
const FloralScraper_1 = require("../Scrapers/FloralScraper");
const cheerio = __importStar(require("cheerio"));
class FloralQuery {
    async getData(page, browser, url, category) {
        await page.goto(url);
        await Helper_1.Helper.waitTillHTMLRendered(page);
        await Helper_1.Helper.autoScroll(page);
        let scraper = new FloralScraper_1.FloralScraper(cheerio.load(await page.content()), browser, category);
        await scraper.getProducts();
    }
}
exports.FloralQuery = FloralQuery;
