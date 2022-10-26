import { Brwser } from "./Browser";
import { Types } from "./helpers/Categories";
import { json2csv } from 'json-2-csv';
import * as fs from 'fs';

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
        for(let i = 0; i < Object.keys(Types).length; i++){
            if(i == 1){
                break;
            }
            await this.browser.getData(Object.values(Types)[i]);
        }
        let document = JSON.parse(fs.readFileSync('./output.json', {
            encoding: 'utf8',
        }));
        json2csv(document, (err:any, csv:any) => {
            if (err) {
                throw err;
            }
            fs.writeFile('./output.csv', csv, function (err:any) {
                if (err) throw err;
            });
        });        
    }
}