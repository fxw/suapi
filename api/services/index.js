const request = require('request');
const cheerio = require('cheerio')
const Product = require('../models')

const scrapePrices = (productId, url,cb) => {
    //http://www2.stampinup.com/ECWeb/ProductDetails.aspx?dbwsdemoid=5003284&email=marineetstamp%40gmail.com&phone=06.09.02.30.11&productID=147108
    //https://www2.stampinup.com/ECWeb/default.aspx?culture=fr-fr&dbwsdemoid=5003284
    let urlToCall = url + productId + "/?country=fr"
    console.log(urlToCall)


   request({url : urlToCall,
                followRedirect: true,
                jar: true
                }, function (error, response, body) {
                if (!error) {
                    //console.log(body);
                    const parser = new Parser(productId)
            const product = parser.parse(body)
            cb(product)
                        
                   
                }
                
                });   

}

class Parser {
    constructor(productId) {
        this.product = new Product(productId)
    }

    parse(html) {
        console.log(html)

        const $ = cheerio.load(html)
        
       // this.product.name = 
       this.product.name = $("body").find('span#ctl00_MainContentContainer_lblItemTitle').html();
        this.product.price = $("body").find('span#ctl00_MainContentContainer_lblItemPrice').html();

        this.product.salesPrice = $("body").find('span#ctl00_MainContentContainer_lblSalePrice').html();
 
        console.log(this.product);

        return this.product
    }
}

module.exports = {
    scrapePrices
}

