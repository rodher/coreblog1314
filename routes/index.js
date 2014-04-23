var express = require('express');
var router = express.Router();

var postController = require('../controllers/post_controller');
var userController = require('../controllers/user_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


/* Autoloading */

router.param('postid',postController.load);  // autoload :postid
router.param('userid', userController.load); // autoload :userid

/* Rutas de Posts */

router.get('/posts', postController.index);
router.get('/posts/new', postController.new);
router.get('/posts/:postid([0-9]+)', postController.show);
router.post('/posts', postController.create);
router.get('/posts/:postid([0-9]+)/edit', postController.edit);
router.put('/posts/:postid([0-9]+)', postController.update);
router.delete('/posts/:postid([0-9]+)', postController.destroy);

/* Rutas de Users */

router.get('/users', userController.index);
router.get('/users/new', userController.new);
router.get('/users/:userid([0-9]+)', userController.show);
router.post('/users', userController.create);
router.get('/users/:userid([0-9]+)/edit', userController.edit);
router.put('/users/:userid([0-9]+)', userController.update);
router.delete('/users/:userid([0-9]+)', userController.destroy);



module.exports = router;
