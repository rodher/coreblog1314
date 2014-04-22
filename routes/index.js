var express = require('express');
var router = express.Router();

var postController = require('../controllers/post_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


/* Rutas de Posts */

router.param('postid',postController.load);  // autoload :postid

router.get('/posts', postController.index);
router.get('/posts/new', postController.new);
router.get('/posts/:postid([0-9]+)', postController.show);
router.post('/posts', postController.create);
router.get('/posts/:postid([0-9]+)/edit', postController.edit);
router.put('/posts/:postid([0-9]+)', postController.update);
router.delete('/posts/:postid([0-9]+)', postController.destroy);

module.exports = router;
