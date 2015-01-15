var express = require('express');
var router = express.Router();
var wechat = require('wechat');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/weixin', wechat('123456', function(req, res, next) {
  next();
}));

router.all('/weixin/cb', function(req, res, next) {
  res.reply("test");
});


module.exports = router;
