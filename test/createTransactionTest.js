const assert = require('chai').assert;
const {validateTransactions} = require('../functions/transactionsFunctions');

const accounts = {
    "accounts": [
        {
            "account":123456789,
            "balance": 45450.00,
            "owner": 7612333392,
            "createdAt": "2012-04-23T18:25:43.511Z"
        },
        {
            "account":987654321,
            "balance": 25450.00,
            "owner": 7612333392,
            "createdAt": "2012-04-23T18:25:43.511Z"
        }
    ]
};

describe('Create_Transaction', function() {
    it('should return new from account balance ', function() {
        var results = validateTransactions({ fromAccountObj: accounts.accounts[0], toAccountObj: accounts.accounts[1], amount: 450 });
        assert.equal(results.newFromAccountBalance, 45000, 'new from account balance is 45000');
    });
    it('should return new to account balance ', function() {
        var results = validateTransactions({ fromAccountObj: accounts.accounts[0], toAccountObj: accounts.accounts[1], amount: 450 });
        assert.equal(results.newToAccountBalance, 25900, 'new to account balance is 25900');
    });
    it('should return -500 from account balance ', function() {
        var results = validateTransactions({ fromAccountObj: accounts.accounts[0], toAccountObj: accounts.accounts[1], amount: 45950 });
        assert.equal(results.newFromAccountBalance, -500, 'new from account balance is -500');
    });
    it('should return null by without necessary funds', function() {
        var results = validateTransactions({ fromAccountObj: accounts.accounts[0], toAccountObj: accounts.accounts[1], amount: 45950.1 });
        assert.equal(results.newFromAccountBalance, null, 'Account under -500');
    });
});
