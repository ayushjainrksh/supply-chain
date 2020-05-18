const express    = require("express"),
      app        = express(),
      PORT       = process.env.PORT || 5000;
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      cors       = require("cors"),
      dotenv  = require("dotenv").config();

const passport = require("passport"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");

app.set("view engine","ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/supply_db", {useNewUrlParser: true, useUnifiedTopology: true });

// ############################
//          SCHEMAS
// ############################

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    usernames: {
        type: String,
    },
    password: {
        type: String,
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// Comment Schema
var commentSchema = mongoose.Schema({
	text : String,
	author : {
		id : {
			type : mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		username : String
	}
}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

// Blog Schema
const blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    description : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            rel : "User"
        },
        username : String
    },
    comments : [
        {
           type : mongoose.Schema.Types.ObjectId,
           ref : "Comment"
        }
    ]
}, {timestamps : true});

const Blog = mongoose.model("Blog", blogSchema);


// Passport Setup
app.use(require("express-session")({
    secret : "I am AJ",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


// ########################
//          ROUTES
// ########################


//Test Route
app.get("/", function(req, res){
    res.send(JSON.stringify({Hi:"hello"}));
});

//Blog Routes
app.post("/", function(req, res) {
    User.findOne({ username: req.query.username }, (err, user) => {
        if (err) {
            console.log(err)
        } else if (user) {
            Blog.create({
                title : req.query.title,
                description : req.query.description,
                image : req.query.image,
                author : {
                    id : user._id,
                    username : req.query.username
                }
            }, function(err, foundBlog){
                if(err)
                    console.log(err);
                else{
                    foundBlog.save();
                    res.redirect("/");
                }
            });
        }
    });
});

app.get("/blogs", function(req, res){
	Blog.find({},function(err, foundBlog){
        if(err)
            console.log(err);
        else
	        res.send(JSON.stringify(foundBlog));
	});
});

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err)
            console.log(err);
        else
            res.send(foundBlog);
    });
});

//    Comment Routes
app.post("/blogs/:id", function(req, res) {
    User.findOne({username : req.query.username}, (err, user) => {
        if(err)
            console.log(err);
        else if(user)
        {
            Blog.findById(req.params.id,function(err,foundBlog){
                if(err)
                    console.log(err);
                else
                {
                    var newComment = {  text : req.query.text , 
                                        author:{
                                            id : user._id,
                                            username : req.query.username
                                        }
                                    };
                    Comment.create(newComment, function(err,newComment){
                        if(err)
                            console.log(err);
                        else
                        {
                            newComment.save();
                            foundBlog.comments.push(newComment);
                            foundBlog.save();
                            res.sendStatus(200);
                        }
                    });
                }
            });
        }
    });
});

//Auth Routes
app.get("/failure", function(req, res){
    res.sendStatus(401);
});

app.post("/login", passport.authenticate("local",{
         failureRedirect : "/failure"
}), function(req, res) {
    res.send(req.user.username);
});

app.get("/isloggedin", function(req, res, next) {
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

app.post("/register", function(req, res){
    var user = new User({name : req.query.name, username : req.query.username});
	User.register(user, req.query.password, function(err, newUser){
		if(err) {
            console.log(err);
            res.sendStatus(409);
        }
        else
        {
        	passport.authenticate("local")(req, res, function(){
         	    if(err){
                     console.log(err);
                     res.sendStatus(401);
                }
                else
                {
                    res.sendStatus(200);
                }
            });
        }
	});
});

app.get("/logout", function(req, res){
    req.logout();
    res.sendStatus(200);
});


app.listen(PORT, function(err){
    if(err)
        console.log(err);
    else
        console.log("Server started on PORT : ", PORT);
});
