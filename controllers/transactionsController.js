const { validationResult } = require('express-validator');
let accounts = require('../data/accounts.json');
let transactions = require('../data/transactions.json');

exports.createTransaction = (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty())
        res.status(400).json({ errors: errors.array() });
    
    try{
        const {validateTransactions} = require('../functions/transactionsFunctions');
        const { fromAccount, toAccount, amount } = req.body;
        const fromAccountObj = accounts.accounts.filter( account => account.account === fromAccount );
        const toAccountObj = accounts.accounts.filter( account => account.account === toAccount );
        if (fromAccountObj.length > 0 && toAccountObj.length > 0){
            const {newFromAccountBalance, newToAccountBalance} = validateTransactions({ fromAccountObj:fromAccountObj[0], toAccountObj: toAccountObj[0], amount:amount });
            if (newFromAccountBalance && newToAccountBalance){
                const sentAt = new Date();
                transactions.transactions.push({ fromAccount, toAccount, amount, sentAt });
                accounts.accounts.some((account) => {
                    if (account.account === fromAccount){
                        account.balance -= amount;
                        return true;
                    }
                });
                accounts.accounts.some((account) => {
                    if (account.account === toAccount){
                        account.balance += amount;
                        return true;
                    }
                });
                res.status(200).json({ msg: 'Transaction Done' });
            }
            else{
                res.status(400).json({ errors: {msg: ' Not funds Enough '} });
            }
        }
        else{
            res.status(400).json({ errors: {msg: ' No data Match '} });
        }
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: {msg: ' Something was wrong '} });
    }

};

exports.getAccountTransactions = (req,res) => {

    try{
        const { _account_id } = req.params;
        const current_transactions = transactions.transactions.filter( transaction => (transaction.fromAccount.toString() === _account_id || transaction.toAccount.toString() === _account_id)  );
        res.status(200).json({ transactions: current_transactions });
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: {msg: ' Something was wrong '} });
    }

};

exports.getReceivedAccountTransactions = (req,res) => {
    
    try{
        const { _account_id } = req.params;
        const current_transactions = transactions.transactions.filter( transaction => transaction.toAccount.toString() === _account_id );
        res.status(200).json({ transactions: current_transactions });
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: {msg: ' Something was wrong '} });
    }

};

exports.getSentAccountTransactions = (req,res) => {
    
    try{
        const { _account_id } = req.params;
        const current_transactions = transactions.transactions.filter( transaction => transaction.fromAccount.toString() === _account_id );
        res.status(200).json({ transactions: current_transactions });
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: {msg: ' Something was wrong '} });
    }

};

exports.getAccountBalance = (req,res) => {
    
    try{
        const { _account_id } = req.params;
        const [current_account] = accounts.accounts.filter( account => account.account.toString() === _account_id );
        res.status(200).json({ balance: current_account });
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: {msg: ' Something was wrong '} });
    }

};