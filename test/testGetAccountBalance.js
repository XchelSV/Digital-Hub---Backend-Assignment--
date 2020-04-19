const request = require('supertest');
const express = require('express');
const app = express();
app.use('/transactions', require('../routes/transactions'));

describe('GET /transactions/account/balance/_account_id', function() {
    it('As a user I should be able to get the current balance for a givenaccount ', function(done) {
        request(app)
            .get('/transactions/account/balance/123456789')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                "balance": {
                    "account": 123456789,
                    "balance": 45450,
                    "owner": 7612333392,
                    "createdAt": "2012-04-23T18:25:43.511Z"
                }
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('As a user I should be able to get the current balance for a givenaccount - Account No match', function(done) {
        request(app)
            .get('/transactions/account/balance/22343424')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({})
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
