/**
 * Created by YCXJ-wanglihui on 2015/1/14.
 */
'use strict';

var request = require('supertest');
var app = require('../../app');
var assert = require('assert');
var support = require('../support');

describe("routes/index.js", function() {
  it("should be 401 GET /weixin/test", function(done) {
    request(app)
      .get("/weixin/test")
      .end(function(err, res) {
        console.info(res.status)
//        console.info(res);
        assert.equal(res.status, 401);
        done();
      })
  });

  it("should be ok GET /weixin/cb with correct token", function(done) {
    var tail = support.tail("123456")
    request(app)
      .get('/weixin/cb'+tail)
      .end(function(err, res) {
        console.info(res.status);
        assert.equal(res.status, 200);
        done();
      });
  })

  it("should be ok POST /weixin/cb with correct token", function(done) {
    var tail = support.tail("123456");
    var info = {
      sp: "fuck",
      user: 'caohua',
      type: 'event',
      event: 'subscribe'
    }
    request(app)
      .post('/weixin/cb'+tail)
      .send(support.template(info))
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.info(res.status);
          console.info(res);
          done();
        }
      });

  })
});

