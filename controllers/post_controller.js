
var models = require('../models');


// Autoload :postid
exports.load = function(req, res, next, id) {
  models.Post
       .find(id)
       .success(function(post) {
          if (post) {
            req.post = post;
            next();
          } else {
            req.flash('error', 'No existe el post con id='+id+'.');
            next(new Error('No existe el post con id='+id+'.'));
          }
       })
       .error(function(error) {
          next(error);
       });
};

//       .find({where: {id: Number(id)}})

// GET /posts
exports.index = function(req, res, next) {
    models.Post
        .findAll({order: [['updatedAt','DESC']]})
        .success(function(posts) {
            res.render('posts/index', {
                posts: posts
            });
            
        })
        .error(function(error) {
            next(error);
        });
};

// GET /posts/33
exports.show = function(req, res, next) {
   res.render('posts/show', {post: req.post});
};

// GET /posts/new
exports.new = function(req, res, next) {

    var post = models.Post.build(
        { title: '',
          body:  ''
        });
    
    res.render('posts/new', {post: post,
                             validate_errors: {} });
};

// POST /posts
exports.create = function(req, res, next) {
  
     var post = models.Post.build(
        { title: req.body.post.title,
          body: req.body.post.body
        });
    
    var validate_errors = post.validate();
    if (validate_errors) {
        console.log("Errores de validación:", validate_errors);

        req.flash('error', 'Los datos del formulario son incorrectos.');
        for (var err in validate_errors) {
           req.flash('error', validate_errors[err]);
        };

        res.render('posts/new', {post: post,
                                 validate_errors: validate_errors});
        return;
    } 
    
    post.save()
        .success(function() {
            req.flash('success', 'Post creado con éxito.');
            res.redirect('/posts');
        })
        .error(function(error) {
            next(error);
        });
};

// GET /posts/33/edit
exports.edit = function(req, res, next) {
    res.render('posts/edit', {post: req.post,
                              validate_errors: {} });
};

// PUT /posts/33
exports.update = function(req, res, next) {
    req.post.title = req.body.post.title;
    req.post.body = req.body.post.body;
                
    var validate_errors = req.post.validate();
    if (validate_errors) {
        console.log("Errores de validación:", validate_errors);

        req.flash('error', 'Los datos del formulario son incorrectos.');
        for (var err in validate_errors) {
            req.flash('error', validate_errors[err]);
        };

        res.render('posts/edit', {post: req.post,
                                  validate_errors: validate_errors});
        return;
    } 
    req.post.save(['title', 'body'])
        .success(function() {
            req.flash('success', 'Post actualizado con éxito.');
            res.redirect('/posts');
        })
        .error(function(error) {
            next(error);
        });};

// DELETE /posts/33
exports.destroy = function(req, res, next) {

    req.post.destroy()
        .success(function() {
            req.flash('success', 'Post eliminado con éxito.');
            res.redirect('/posts');
        })
        .error(function(error) {
            next(error);
        });};

// GET /posts/search?q=texto
exports.search = function(req, res, next) {
  if (req.query.q) {
    console.log(req.query.q)
    var q = "%"+req.query.q.replace(/\s/g,"%")+"%";
    models.Post
      .findAll({where: ["title LIKE ? OR body LIKE ?", q, q]})
      .success(function(posts) {
          res.render('posts/search', {
             busq: req.query.q,  posts: posts
          });
          
      })
      .error(function(error) {
          next(error);
      }); 
  } else{
      res.render('posts/search', {
          posts: null, busq: ""
      });
  };

};

