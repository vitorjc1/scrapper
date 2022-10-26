"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const Browser_1 = require("./Browser");
const Categories_1 = require("./helpers/Categories");
class App {
    constructor() {
        this.browserAlready = false;
        this.browser = new Browser_1.Brwser();
    }
    async checkBrowser() {
        if (!this.browserAlready) {
            await this.browser.startBrowser();
        }
    }
    async getAllData() {
        await this.checkBrowser();
        // await this.browser.getData(Types.Floral);
        await this.browser.getData(Categories_1.Types.Produce);
    }
}
exports.App = App;
