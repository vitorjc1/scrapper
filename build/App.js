"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const Browser_1 = require("./Browser");
const Categories_1 = require("./helpers/Categories");
class App {
    constructor() {
        this.browser = new Browser_1.Brwser();
    }
    async getFloralData() {
        await this.browser.startBrowser();
        await this.browser.getData(Categories_1.Categories.Floral);
    }
}
exports.App = App;
