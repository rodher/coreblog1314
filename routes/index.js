var express = require('express');
var router = express.Router();

var postController = require('../controllers/post_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* Rutas de sesiones */

router.get('/login',  sessionController.new); 
                     // obtener el formulario a rellenar para hacer login. 
router.post('/login', sessionController.create); 
                     // enviar formulario para crear la sesión.
router.get('/logout', sessionController.destroy); 
                     // destruir la sesión actual.

/* Autoloading */

router.param('postid',postController.load);  // autoload :postid
router.param('userid', userController.load); // autoload :userid

/* Rutas de Posts */

router.get('/posts', postController.index);
router.get('/posts/new', sessionController.loginRequired,
                         postController.new);
router.get('/posts/:postid([0-9]+)', postController.show);
router.post('/posts', sessionController.loginRequired,
                      postController.create);
router.get('/posts/:postid([0-9]+)/edit', sessionController.loginRequired,
                                          postController.loggedUserIsAuthor,
                                          postController.edit);
router.put('/posts/:postid([0-9]+)', sessionController.loginRequired,
                                     postController.loggedUserIsAuthor,
                                     postController.update);
router.delete('/posts/:postid([0-9]+)', sessionController.loginRequired,
                                        postController.loggedUserIsAuthor,
                                        postController.destroy);

/* Rutas de Users */

router.get('/users', userController.index);
router.get('/users/new', userController.new);
router.get('/users/:userid([0-9]+)', userController.show);
router.post('/users', userController.create);
router.get('/users/:userid([0-9]+)/edit', sessionController.loginRequired,
                                          userController.loggedUserIsUser,
                                          userController.edit);
router.put('/users/:userid([0-9]+)', sessionController.loginRequired,
                                     userController.loggedUserIsUser,
                                     userController.update);
// router.delete('/users/:userid([0-9]+)', sessionController.loginRequired,
//                                         userController.destroy);



module.exports = router;
