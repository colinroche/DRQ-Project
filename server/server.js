var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')
var cors = require('cors');
var router = express.Router()
var PORT = 8081;

var mongoose = require('mongoose');
var mongoDB = 'mongodb://user1:password123@ds115094.mlab.com:15094/projectdb';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    password: String
})
var postSchema = new Schema({
    title: String,
    content: String,
    background: String,
    personality: String
})
var PostModel = mongoose.model('post', postSchema);
module.exports = mongoose.model('user', userSchema, 'users')

app.use(cors())
//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
/*app.post('/name', function(req, res){
    res.send("Hello you sent " +
    req.body.firstname + " " +
    req.body.lastname);
})*/

app.get('/', function (req, res) {
   res.send('Hello from Express');
})

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.background);
    console.log(req.body.personality);

    PostModel.create({
        title: req.body.title,
        content: req.body.content,
        background: req.body.background,
        personality: req.body.personality
    });
    res.send('Item added');


})

app.get('/api/posts', function(req, res){
    PostModel.find(function(err, data){
        res.json(data);
    });
})

app.get('/api/posts/:id', function(req, res){
    console.log("Read post " +req.params.id);

    //PostModel.find({_id : req.params.id}, 
    PostModel.findById(req.params.id,
        function (err, data) {
            res.json(data);
        });
})

app.put('/api/posts/:id', function(req, res){
    console.log("Update Post" +req.params.id);
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.background);
    console.log(req.body.personality);

    PostModel.findByIdAndUpdate(req.params.id, req.body, 
        function(err, data){
            res.send(data);
        })
})

app.delete('/api/posts/:id', function(req, res){
    console.log(req.params.id);

    PostModel.deleteOne({_id:req.params.id},
    function(err, data)
    {
        if(err)
            res.send(err);
        res.send(data);
    })
})


var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

function verifyToken(req, res, next) {
    // Unauthorized request if Token isn't found
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    // splits authorization into an array where there is a space, [0] for 'Bearer' [1] for the token
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    // token present, only verifies if valid
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) =>{
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if  (error) {
            console.log(error);
        } else {
            // create token to store register data
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
}) 

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                // create token to store login data
                let payload = { subject: user._id}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

// only excutes code if verified
/*router.get('/character', verifyToken, (req, res) => {
    let information = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
    ]
    res.json(information)
})*/

module.exports = router