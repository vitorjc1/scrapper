import { FloralCategories, Types, ProduceCategories, BakeryCategories, BakingEssentialsCategories, BeverageCategories, BreakfastCategories } from './helpers/Categories';
import { FloralUrls, ProduceUrls, BakeryUrl, BakingEssentialsUrls, BeveragesUrls, BreakfastUrls } from './helpers/Urls';
import { Query } from './Querys/Query';
import { Scraper } from './Scrapers/Scraper';
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

export class Brwser{

    public page!: Page;
    public browser!: Browser | null;
    public scraper!: Scraper;
    public query = new Query();

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
    
          this.browser = await puppeteer.launch({ headless, ignoreHTTPSErrors: true, args});
          this.page = await this.browser.newPage();
        }
      }

      async getData(type: Types){
        await this.query.start(this.page);
        try{
          switch(type){
            case Types.Floral:
              for(let i = 0; i < Object.keys(FloralCategories).length; i++){
                await this.query.getData(this.page,this.browser!, Object.values(FloralUrls)[i], Object.values(FloralCategories)[i]);
              }
              break;
            
            case Types.Produce:
              for(let i = 0; i < Object.keys(ProduceCategories).length; i++){
                await this.query.getData(this.page,this.browser!, Object.values(ProduceUrls)[i], Object.values(ProduceCategories)[i]);
              }
              break;

            case Types.Bakery:
              for(let i = 0; i < Object.keys(BakeryCategories).length; i++){
                await this.query.getData(this.page,this.browser!, Object.values(BakeryUrl)[i], Object.values(BakeryCategories)[i]);
              }
              break;
              
            case Types.BakingEssentials:
                for(let i = 0; i < Object.keys(BakingEssentialsCategories).length; i++){
                  await this.query.getData(this.page,this.browser!, Object.values(BakingEssentialsUrls)[i], Object.values(BakingEssentialsCategories)[i]);
                }
              break;

            case Types.Beverage:
              for(let i = 0; i < Object.keys(BeverageCategories).length; i++){
                await this.query.getData(this.page,this.browser!, Object.values(BeveragesUrls)[i], Object.values(BeverageCategories)[i]);
              }
              break;

            case Types.Breakfast:
              for(let i = 0; i < Object.keys(BreakfastCategories).length; i++){
                await this.query.getData(this.page,this.browser!, Object.values(BreakfastUrls)[i], Object.values(BreakfastCategories)[i]);
              }
              break;

          }
        }catch(error: any){
            throw error;
        }              
      }

     

      
}