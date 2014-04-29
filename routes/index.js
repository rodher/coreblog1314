var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET creditos */
router.get('/creditos', function(req, res, next){
	res.render('creditos');
});

module.exports = router;
