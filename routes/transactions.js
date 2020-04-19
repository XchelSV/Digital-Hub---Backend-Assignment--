const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const transactionController = require('../controllers/transactionsController');

/**
 * @swagger
 * tags:
 *   name: Transfer Money
 */
/**
 * @swagger
 *
 * /transactions:
 *   post:
 *     summary: As a user should be able to transfer money 
 *     tags: [Transfer Money]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payload'
 * 
 *     responses:
 *       200:
 *         description: Transaction Successfull
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  description: Successfull Msg.
 * 
 */
router.post('/',
    [
        check('fromAccount','fromAccount is required').not().isEmpty(),
        check('toAccount','toAccount is required').not().isEmpty(),
        check('amount','amount is required').not().isEmpty(),
        check('amount','amount must be number').not().isString(),
    ],
    transactionController.createTransaction
);

/**
 * @swagger
 * tags:
 *   name: Transaction History
 */
/**
 * @swagger
 *
 * /transactions/{_account_id}:
 *   get:
 *     summary: As a user I should be able to get all transactions for a given account 
 *     tags: [Transaction History]
 *     parameters:
 *       - name: _account_id
 *         description: Account Number
 *         in:  path
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: Transaction Successfull
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Transactions'
 * 
 */
router.get('/:_account_id',
    transactionController.getAccountTransactions
);
/**
 * @swagger
 *
 * /transactions/received/{_account_id}:
 *   get:
 *     summary: As a user I should be able to get all received transactions from a given account  
 *     tags: [Transaction History]
 *     parameters:
 *       - name: _account_id
 *         description: Account Number
 *         in:  path
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: Transaction Successfull
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Transactions'
 * 
 */
router.get('/received/:_account_id',
    transactionController.getReceivedAccountTransactions
);
/**
 * @swagger
 *
 * /transactions/sent/{_account_id}:
 *   get:
 *     summary: As a user I should be able to get all sent transactions for a given account   
 *     tags: [Transaction History]
 *     parameters:
 *       - name: _account_id
 *         description: Account Number
 *         in:  path
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: Transaction Successfull
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Transactions'
 * 
 */
router.get('/sent/:_account_id',
    transactionController.getSentAccountTransactions
);
/**
 * @swagger
 * tags:
 *   name: Account Balance
 */
/**
 * @swagger
 *
 * /transactions/account/balance/{_account_id}:
 *   get:
 *     summary: As a user I should be able to get the current balance for a given account 
 *     tags: [Account Balance]
 *     parameters:
 *       - name: _account_id
 *         description: Account Number
 *         in:  path
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: Transaction Successfull
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Balance'
 * 
 */
router.get('/account/balance/:_account_id',
    transactionController.getAccountBalance
);

module.exports = router;