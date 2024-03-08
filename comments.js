//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Create db
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'comments.db',
    autoload: true
});

//Create id
var id = 1;

//Create comments
app.get('/comments', function(req, res) {
    db.find({}, function(err, docs) {
        res.json(docs);
    });
});

//Create comment
app.post('/comments', function(req, res) {
    var newComment = {
        id: id++, //id    
    }
    newComment.author = req.body.author;
    newComment.text = req.body.text;
    db.insert(newComment, function(err, comment) {
        res.json(comment);
    });
}
);
