
'use strict'

const productCtrl = require('../controllers')

module.exports = (app) => {

    app.route('/price/:productId')
        .get(productCtrl.getPrice)
    
    
    app.use((req, res) => {
        res.status(404)
            .send({url: `sorry friend, but url ${req.originalUrl} is not found`})
    })
}

