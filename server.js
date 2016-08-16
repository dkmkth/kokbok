var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipes');
var Recipe = require('./app/models/recipes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

var port = process.env.PORT || 8080;        // set our port

// Routes for api
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('API request handled.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /recipes
router.route('/recipes')

// create a recipe (accessed at POST http://localhost:8080/api/recipes)
.post(function(req, res) {

  var recipe = new Recipe();      // create a new instance of the Recipes model
  recipe.name = req.body.name;  // set the recipes name (comes from the request)
  recipe.ingredients = req.body.ingredients;
  recipe.description = req.body.description;
  recipe.tags = req.body.tags;
  recipe.comments = req.body.comments;
  recipe.date = req.body.date;

  // save the recipe and check for errors
  recipe.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Recipes created!' });
  });

})

// get all the recipes (accessed at GET http://localhost:8080/api/recipes)
.get(function(req, res) {
  Recipe.find(function(err, recipes) {
    if (err) {
      res.send(err);
    }

    res.send(recipes);
  });
});


// on routes that end in /recipes/:recipe_id
router.route('/recipes/:recipe_id')

// get the recipe with that id (accessed at GET http://localhost:8080/api/recipes/:recipe_id)
.get(function(req, res) {
  Recipe.findById(req.params.recipe_id, function(err, recipe) {
    if (err) {
      res.send(err);
    }
    res.json(recipe);
  });
})

// update the recipe with this id (accessed at PUT http://localhost:8080/api/recipes/:recipe_id)
.put(function(req, res) {

  // use our recipe model to find the recipe we want
  Recipe.findById(req.params.recipe_id, function(err, recipe) {

    if (err) {
      res.send(err);
    }

    // update the recipe info
    // [TODO]

    // save the recipe
    recipe.save(function(err) {
      if (err) {
        res.send(err);
      }
    });
  });
})

// delete the recipe with this id (accessed at DELETE http://localhost:8080/api/recipes/:recipe_id)
.delete(function(req, res) {
  Recipe.remove({
    _id: req.params.recipe_id
  }, function(err, recipe) {
    if (err)
    res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
});

router.route('/recipes/comment/:recipe_id')

// Add a comment with this id (accessed at PUT http://localhost:8080/api/recipes/comment/:recipe_id)
.put(function (req, res) {
  Recipe.findById(req.params.recipe_id, function(err, recipe) {

    if (err) {
      res.send(err);
    }

    // update the comments array
    var comments = recipe.comments;
    var newComment = {"poster": req.body.name, "comment": req.body.comment, "replies": []};
    comments.unshift(newComment);
    recipe.comments = comments;

    // save the recipe
    recipe.save(function(err) {
      if (err) {
        res.send(err);
      }
    });
  });
});

router.route('/recipes/:recipe_id/:comment_id')

// Add a reply with this id (accessed at PUT http://localhost:8080/api/recipes/:recipe_id/:comment_id)
.put(function (req, res) {
  Recipe.findById(req.params.recipe_id, function(err, recipe) {

    if (err) {
      res.send(err);
    }

    // update the comments array
    var comments = recipe.comments;
    for (var i = 0; i < comments.length; i++) {
      if (comments[i] === req.params.comment_id) {
        var replies = comments[i].replies;
        var newReply = {"poster": req.body.name, "reply": req.body.reply};
        replies.unshift(newReply);
        comments[i].replies = newReply;
        recipe.comments = comments;
      }
    }

    // save the recipe
    recipe.save(function(err) {
      if (err) {
        res.send(err);
      }
    });
});
});

// all routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Started listening on port ' + port);
