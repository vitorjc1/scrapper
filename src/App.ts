import { Brwser } from "./Browser";
import { Categories } from "./helpers/Categories";

export class App{
    
    public browser: Brwser;
    
    constructor(){
        this.browser = new Brwser();
    }

    async getFloralData(){
        await this.browser.startBrowser();
        await this.browser.getData(Categories.Floral);
    }
}