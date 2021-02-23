const express = require('express');
const controller = require('../controller/controller')
const route = express.Router();


const services = require('../services/render')


route.get('/', services.homeRoutes)

route.get('/GetJSON', (req, res) => {
    res.send('JSON')
})




//API Party
route.post('/api/party', controller.partyControllers.create);
route.get('/api/party', controller.partyControllers.find);
route.put('/api/party/:id', controller.partyControllers.update);
route.delete('/api/party/:id', controller.partyControllers.delete);


//API Transactions
route.post('/api/transaction', controller.transactionControllers.create);
route.get('/api/transaction', controller.transactionControllers.find);
route.put('/api/transaction/:id', controller.transactionControllers.update);
route.delete('/api/transaction/:id', controller.transactionControllers.delete);






module.exports = route; 