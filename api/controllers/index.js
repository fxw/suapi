
'use strict'

const svc = require('../services')

const getPrice = (req, res) => {
    const productId = req.params.productId
    svc.scrapePrices(productId, SuUrls.productUrl, (product) => { res.send(product);
    })
}



const SuUrls = {
    productUrl: 'https://www2.stampinup.com/ecweb/product/'
}

module.exports = {
    getPrice
}
