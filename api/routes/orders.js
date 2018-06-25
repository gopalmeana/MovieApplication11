const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /orders'
    });
});

route.post('/', (req, res, next) => {
    const data = {
        orderId: req.body.orderId,
        value: req.body.price
    }
    res.status(200).json({
        message: 'Handling POST request to /orders',
        data: data
    });
});

route.put('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling PUT request to /orders'
    });
});

route.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling PUT request to /orders'
    });
});

route.get('/:orderId', (req, res, next) => {
    var id = req.params.orderId;
    if(id === '123'){
        res.status(200).json({
            message: 'if Handling GET id request to /orders',
            id: id 
        });     
    } else {
        res.status(200).json({
            message: 'else id no Handling GET id request to /orders'
        });
    }
});

module.exports = route;