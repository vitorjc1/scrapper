"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brwser = void 0;
const Categories_1 = require("./helpers/Categories");
const Urls_1 = require("./helpers/Urls");
const Query_1 = require("./Querys/Query");
const puppeteer_1 = __importDefault(require("puppeteer"));
class Brwser {
    constructor() {
        this.query = new Query_1.Query();
    }
    async startBrowser() {
        const args = [
            '--cryptauth-http-host ""',
            '--disable-accelerated-2d-canvas',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-browser-side-navigation',
            '--disable-client-side-phishing-detection',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-device-discovery-notifications',
            '--disable-extensions',
            '--disable-features=site-per-process',
            '--disable-hang-monitor',
            '--disable-java',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-setuid-sandbox',
            '--disable-sync',
            '--disable-translate',
            '--disable-web-security',
            '--disable-webgl',
            '--metrics-recording-only',
            '--no-first-run',
            '--safebrowsing-disable-auto-update',
            '--enable-automation',
            '--password-store=basic',
            '--use-mock-keychain',
        ];
        if (!this.browser) {
            let headless = false;
            this.browser = await puppeteer_1.default.launch({ headless, ignoreHTTPSErrors: true, args });
            this.page = await this.browser.newPage();
        }
    }
    async getData(type) {
        await this.query.start(this.page);
        try {
            switch (type) {
                case Categories_1.Types.Floral:
                    for (let i = 0; i < Object.keys(Categories_1.FloralCategories).length; i++) {
                        await this.query.getData(this.page, this.browser, Object.values(Urls_1.FloralUrls)[i], Object.values(Categories_1.FloralCategories)[i]);
                    }
                    break;
                case Categories_1.Types.Produce:
                    for (let i = 0; i < Object.keys(Categories_1.ProduceCategories).length; i++) {
                        await this.query.getData(this.page, this.browser, Object.values(Urls_1.ProduceUrls)[i], Object.values(Categories_1.ProduceCategories)[i]);
                    }
                    break;
                case Categories_1.Types.Bakery:
                    for (let i = 0; i < Object.keys(Categories_1.BakeryCategories).length; i++) {
                        await this.query.getData(this.page, this.browser, Object.values(Urls_1.BakeryUrl)[i], Object.values(Categories_1.BakeryCategories)[i]);
                    }
                    break;
                case Categories_1.Types.BakingEssentials:
                    for (let i = 0; i < Object.keys(Categories_1.BakingEssentialsCategories).length; i++) {
                        await this.query.getData(this.page, this.browser, Object.values(Urls_1.BakingEssentialsUrls)[i], Object.values(Categories_1.BakingEssentialsCategories)[i]);
                    }
                    break;
                case Categories_1.Types.Beverage:
                    for (let i = 0; i < Object.keys(Categories_1.BeverageCategories).length; i++) {
                        await this.query.getData(this.page, this.browser, Object.values(Urls_1.BeveragesUrls)[i], Object.values(Categories_1.BeverageCategories)[i]);
                    }
                    break;
                case Categories_1.Types.Breakfast:
                    for (let i = 0; i < Object.keys(Categories_1.BreakfastCategories).length; i++) {
                        await this.query.getData(this.page, this.browser, Object.values(Urls_1.BreakfastUrls)[i], Object.values(Categories_1.BreakfastCategories)[i]);
                    }
                    break;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Brwser = Brwser;
