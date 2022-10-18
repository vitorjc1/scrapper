import { Page } from "puppeteer";

export class Helper{
    public static async waitTillHTMLRendered(page: Page, timeout = 30000) {
        const checkDurationMsecs = 1000;
        const maxChecks = timeout / checkDurationMsecs;
        let lastHTMLSize = 0;
        let checkCounts = 1;
        let countStableSizeIterations = 0;
        const minStableSizeIterations = 3;
    
        while (checkCounts++ <= maxChecks) {
          let html = await page.content();
          let currentHTMLSize = html.length;
    
          let bodyHTMLSize = await page.evaluate(() => document.body?.innerHTML.length);
    
          if (process.env.DEBUG === 'true') {
            console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);
          }
    
          if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
            countStableSizeIterations++;
          else
            countStableSizeIterations = 0; //reset the counter
    
          if (countStableSizeIterations >= minStableSizeIterations) {
            if (process.env.DEBUG === 'true') {
              console.log("Page rendered fully..");
            }
            break;
          }
    
          lastHTMLSize = currentHTMLSize;
          await page.waitForTimeout(checkDurationMsecs);
        }
    }

    public static getBase64Image(img:any, document:any) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    public static sleep(milisegundos: number) {
      return new Promise(resolve => setTimeout(resolve, milisegundos));
    }

    public static async autoScroll(page: Page){
      await page.evaluate(async () => {
          await new Promise<void>((resolve) => {
              var totalHeight = 0;
              var distance = 100;
              var timer = setInterval(() => {
                  var scrollHeight = document.body.scrollHeight;
                  window.scrollBy(0, distance);
                  totalHeight += distance;
  
                  if(totalHeight >= scrollHeight - window.innerHeight){
                      clearInterval(timer);
                      resolve();
                  }
              }, 100);
          });
      });
    }
    
}