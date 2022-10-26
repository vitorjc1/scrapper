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
exports.App = void 0;
const Browser_1 = require("./Browser");
const Categories_1 = require("./helpers/Categories");
const json_2_csv_1 = require("json-2-csv");
const fs = __importStar(require("fs"));
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
        for (let i = 0; i < Object.keys(Categories_1.Types).length; i++) {
            if (i == 1) {
                break;
            }
            await this.browser.getData(Object.values(Categories_1.Types)[i]);
        }
        let document = JSON.parse(fs.readFileSync('./output.json', {
            encoding: 'utf8',
        }));
        (0, json_2_csv_1.json2csv)(document, (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFile('./output.csv', csv, function (err) {
                if (err)
                    throw err;
            });
        });
    }
}
exports.App = App;
