const request = require('supertest');
const express = require('express');
const app = express();
app.use('/transactions', require('../routes/transactions'));

describe('GET /transactions/sent/_account_id', function() {
    it('As a user I should be able to get all sent transactions for a givenaccount using a GET method ', function(done) {
        request(app)
            .get('/transactions/sent/123456789')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                "transactions":[
                    {
                        "fromAccount":123456789,
                        "toAccount":987654321,
                        "amount":876.88,
                        "sentAt": "2012-04-23T18:25:43.511Z"
                    },
                    {
                        "fromAccount":123456789,
                        "toAccount":987654321,
                        "amount":234.66,
                        "sentAt": "2012-04-21T18:25:43.511Z"
                    },
                    {
                        "fromAccount":123456789,
                        "toAccount":987654321,
                        "amount":234.88,
                        "sentAt": "2012-04-23T18:25:43.511Z"
                    }
                ]
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('As a user I should be able to get all sent transactions for a givenaccount using a GET method - Account Id no matches ', function(done) {
        request(app)
            .get('/transactions/sent/987654321')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                "transactions":[]
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
