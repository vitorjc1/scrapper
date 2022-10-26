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
exports.Scraper = void 0;
const Helper_1 = require("../helpers/Helper");
const cheerio = __importStar(require("cheerio"));
const fs = __importStar(require("fs"));
class Scraper {
    constructor(pagina, browser, category) {
        this.$ = pagina;
        this.browser = browser;
        this.category = category;
    }
    async getProducts() {
        var _a, _b;
        let products = this.$(".css-z4hfda").eq(0).find(".css-1bfgc1k").eq(0).find('.css-1381xmv-ItemsGridWithPostAtcRecommendations').eq(0).find('ul').eq(0).find('li');
        let productsArray = products.toArray();
        console.log(products.length);
        let data = [];
        for (const i of productsArray.keys()) {
            if (i == 3)
                break;
            let newPage = await this.browser.newPage();
            let url = (_a = products.eq(i).find(".css-1pc1srv-ItemCardHoverProvider").eq(0).find("a").first().attr('href')) === null || _a === void 0 ? void 0 : _a.toString();
            await newPage.goto('https://instacart.ca' + url);
            await Helper_1.Helper.waitTillHTMLRendered(newPage);
            let $2 = cheerio.load(await newPage.content());
            let obj = {
                Name: $2(".css-16ptqna").eq(0).text(),
                Price: $2(".css-1u4ofbf").eq(0).find('span').eq(0).text(),
                Details: $2(".css-kxnfom").eq(0).text(),
                Image: (_b = $2(".ic-image-zoomer").eq(0).find('img').eq(0).attr('src')) === null || _b === void 0 ? void 0 : _b.toString(),
                Category: this.category
            };
            data.push(obj);
            newPage.close();
        }
        let results = [];
        let document = fs.readFileSync('./output.json', {
            encoding: 'utf8',
        });
        if (document != '') {
            results = JSON.parse(document);
        }
        results.push(...data);
        console.log(results);
        fs.writeFileSync('./output.json', JSON.stringify(results));
        return data;
    }
}
exports.Scraper = Scraper;
