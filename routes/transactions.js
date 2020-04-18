const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const transactionController = require('../controllers/transactionsController');

// /api/transactions
router.post('/',
    [
        check('fromAccount','fromAccount is required').not().isEmpty(),
        check('toAccount','toAccount is required').not().isEmpty(),
        check('amount','amount is required').not().isEmpty(),
        check('amount','amount must be number').not().isString(),
    ],
    transactionController.createTransaction
);

module.exports = router;