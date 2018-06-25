const express  = require('express');
const router = express.Router();
const Product = require('../models/product'); 
const mongoose = require('mongoose');

// Hendle get incomming request
router.get('/', (req, res, next) => {
    Product.find().exec()
    .then(docs => {
        console.log('doc', docs);
        res.status(200).json(docs);
    })
    .catch(err => { res.status(500).json({
        error: err
    });
});
   
});

router.post('/', (req, res, next) => {
const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
});product
.save()
.then(result => {
    res.status(200).json({
        message: 'Handling POST request to /products',
        data: product
    });
})
.catch(err => console.log(err));
    res.status(500).json({
       error: err
    });
});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updatedOps = {};
    for(const ops of req.body){
        updatedOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updatedOps })
    .exec()
    .then(result => {res.status(200).json(result)})
    .catch(err => {res.status(500).json({error: err,
    message: "data not available"})});
    // res.status(200).json({
    //     message: 'Handling PUT request to /products'
    // });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    
    Product.findOneAndRemove({ _id: id })
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get('/:productId', (req, res, next) => {
    var id = req.params.productId;

Product.findById({ _id: id }).exec()
.then(docs => { 
    if(docs.length >=0 ) {
        res.status(200).json(docs);
    } else {
        res.status(400).json({
            message: "No record Found" + id
        });
    }
   
}).catch(err => {
    res.status(500).json({ 
        message: "No valid entry found this id",
     })
    });
});

module.exports = router;