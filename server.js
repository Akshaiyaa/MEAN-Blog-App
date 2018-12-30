var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogfall2018');

var PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: String,
  tag: {type: String, enum: ['Politics', 'Economy', 'Education']},
  posted: {type: Date, default: Date.now}
}, {collection: 'post'});

var PostModel = mongoose.model("PostModel", PostSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/blogpost", createPost);
app.get("/api/blogpost", getAllPosts);
app.get("/api/blogpost/:id", getPostById);
app.delete("/api/blogpost/:id", deletePost);
app.put("/api/blogpost/:id", updatePost);

function updatePost(req, res) {
  var postId = req.params.id;
  var post = req.body;// store value in a local variable called post
  PostModel
    .update({_id: postId},{
      title: post.title,
      body: post.body
    })//thing to update,what to update with  - method provided by mongoose
    .then(
      function (status){
        res.sendStatus(200);
      },
      function (err) {
        res.sendStatus(400);
      }
    );
}

function getPostById(req, res){  //To retrieve the post to be updated by its id
  var postId = req.params.id;
  PostModel
    .findById({_id: postId})// find() gives array; To get a 1 particular id - findById
    .then(
      function (post) {
        res.json(post);// send response back to client as a json object - line 17 in app.js
      },
      function (err){
        res.sendStatus(400);
      }
    );
}

function deletePost(req, res) {
  var postId = req.params.id;
  PostModel
    .remove({_id: postId})//{} removes everything
    .then(
      function (status) {
        res.sendStatus(200);
      },
      function(err) {
        res.sendStatus(400);
      }
    );
}

function getAllPosts(req, res) {
  PostModel
    .find()
    .then(
      function (posts) {
        res.json(posts);
      },
      function (err) {
        res.sendStatus(400);
      }
    );
}

function createPost(req, res) {
  var post = req.body;
  console.log(post);
  PostModel
    .create(post)
    .then(
      function (postObj) {
          res.json(200);
      },
      function (error) {
          res.sendStatus(400);
      }
    );

}

app.listen(3000);
