import { Brwser } from "./Browser";
import { Types } from "./helpers/Categories";

export class App{
    
    public browser: Brwser;
    public browserAlready: boolean = false;
    
    constructor(){
        this.browser = new Brwser();
    }

    async checkBrowser(){
        if(!this.browserAlready){
            await this.browser.startBrowser();
        }
    }

    async getAllData(){
        await this.checkBrowser();
        // await this.browser.getData(Types.Floral);
        await this.browser.getData(Types.Produce);
    }
}