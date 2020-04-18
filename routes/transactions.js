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
router.get('/:_account_id',
    transactionController.getAccountTransactions
);
router.get('/received/:_account_id',
    transactionController.getReceivedAccountTransactions
);
router.get('/sent/:_account_id',
    transactionController.getSentAccountTransactions
);

module.exports = router;