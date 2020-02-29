const express    = require("express"),
      app        = express(),
      PORT       = 5000||process.env.PORT;
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      cors = require("cors");

const passport = require("passport"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");

app.set("view engine","ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

mongoose.connect("mongodb://localhost/supply_db");

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
    // image : String,
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
    // console.log('req.session : '+req.session);
    next();
});


// ########################
//          ROUTES
// ########################

app.get("/", function(req, res){
    res.send(JSON.stringify({Hi:"hello"}));
});

app.post("/", function(req, res) {
    // console.log(req);
    // console.log(req.query);
    // const uid = null;
    User.findOne({ username: req.query.username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            console.log(user);
            // uid = user._id;
            Blog.create({
                title : req.query.title,
                description : req.query.description,
                author : {
                    id : user._id,
                    username : req.query.username
                }
            }, function(err, foundBlog){
                if(err)
                    console.log(err);
                else{
                    foundBlog.save();
                    console.log(foundBlog);
                    res.redirect("/");
                }
            });
        }
    })
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
            console.log(foundBlog);
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
                            console.log(newComment);
                            foundBlog.comments.push(newComment);
                            foundBlog.save();
                            res.sendStatus(200);
                            // res.redirect("/dogs/"+req.params.id+"/show");
                        }
                    });
                }
            });
        }
    });
});

//      Auth Routes
app.get("/success", function(req, res){
    // console.log(req.user.username);
    res.send(req.user.username);
});

app.get("/failure", function(req, res){
    // res.send("Failed");
    res.sendStatus(204);
});

app.post("/login", passport.authenticate("local",{
        //  successRedirect : "/success",
         failureRedirect : "/failure"
}), function(req, res) {
    // console.log("AUTH : " + req.user);
    res.send(req.user.username);
});

app.get("/isloggedin", function(req, res, next) {
    console.log(req.user);
    // console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

app.post("/register", function(req, res){
    var user = new User({name : req.query.name, username : req.query.username});
    console.log("USER : "+user);
	User.register(user, req.query.password, function(err, newUser){
		if(err)
			console.log(err);
        else
        {
        	passport.authenticate("local")(req, res, function(){
         	    if(err)
         	     	 console.log(err);
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
    console.log("Server log out...");
    res.sendStatus(200);
});

//Auth functions
function isLoggedIn(req, res, next){
    console.log("USER : " + req.user);
	if(req.user)
        return next();
	res.redirect("/login");
}

function isAuth(req, res, next){
	if(req.isAuthenticated())
	{
		Blog.findById(req.params.id, function(err, foundBlog){
	    	if(err)
	    	{
	    		res.redirect("back");
	    	}
	    	else
	    	{
	    		if(foundBlog.author.id.equals(req.user._id)){
	    			return next();
	    		}
	    		res.redirect("back");
	    	}
		});
	}
    else
    {
    	res.redirect("/login");
    }
}



app.listen(PORT, function(err){
    if(err)
        console.log(err);
    else
        console.log("Server started...");
})