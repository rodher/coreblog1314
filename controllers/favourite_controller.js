
var models = require('../models');

var favouriteController = require('./favourite_controller');

// GET /users/33/favourites
exports.index = function(req, res, next) {

    models.Favourite
        .findAll({where: {  UserId: req.user.id,
                            best: [4, 5]},
                  order: [['best','DESC'],[models.Post, 'updatedAt', 'DESC']],
                  include: [ {model: models.Post,
                            include:[{model: models.User, as: 'Author'}
                            ]
                            } ]})
        .success(function(favourites) {

            var posts = favourites.map(function(favourite){
                favourite.post.best =favourite.best;
                return favourite.post;
            });
            res.render('favourites/index', {
                posts: posts
            });
        })
        .error(function(error) {
            next(error);
        });
};

// PUT /users/33/favourites
exports.add = function(req, res, next){
    var newbest = req.body.best || 5;

    var redir = req.body.redir || '/users/'+ req.user.id+'/favourites';

    models.Favourite.
        findOrCreate({  UserId: req.user.id,
                        PostId: req.post.id
                    },
                    {best: 5})
        .success(function(favourite){
            favourite.best = newbest;

            favourite.save()
                .success(function(){
                    req.flash('success', 'Favorito marcado con éxito.');
                    res.redirect(redir);
                })
                .error(function(error) {
                    next(error);
                });
        })
        .error(function(error) {
            next(error);
        });
        
};

// DELETE /users/33/favourites/66
exports.del = function(req, res, next) {

    var redir = req.body.redir || '/users/'+ req.user.id+'/favourites';

    models.Favourite
        .find({where: {  UserId: req.user.id,
                        PostId: req.post.id
                    }})
        .success(function(favourite){

            if(favourite){
                favourite.destroy()
                    .success(function(){
                    req.flash('success', 'Favorito eliminado con éxito.');
                    res.redirect(redir);
                })
                .error(function(error) {
                    next(error);
                });
            }
        })
        .error(function(error) {
            next(error);
        });
};