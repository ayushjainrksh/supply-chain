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
        // required: true
    },
    usernames: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// Blog Schema
const blogSchema = new mongoose.Schema({
    title : String,
    // image : String,
    description : String,
    // author : {
    //     id : {
    //         type : mongoose.Schema.Types.ObjectId,
    //         rel : "User"
    //     },
    //     username : String
    // }
});

const Blog = mongoose.model("Blog", blogSchema);


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
    console.log(req.query);

    Blog.create({
        title : req.query.title,
        description : req.query.description,
    }, function(err, foundBlog){
        if(err)
            console.log(err);
        else{
            foundBlog.save();
            console.log(foundBlog);
            res.redirect("/");
        }
    });
})

app.get("/blogs", function(req, res){
	Blog.find({},function(err, foundBlog){
        if(err)
            console.log(err);
        else
	        res.send(JSON.stringify(foundBlog));
	});
});


//      Auth Routes
app.get("/success", function(req, res){
    // console.log(JSON.stringify(req));
    // console.log("req.sesison : " + req.session);
    console.log(req.user.username);
    res.send(req.user.username);
	// res.render("login");
});

app.get("/failure", function(req, res){
    res.send("Failed");
});

app.post("/login", passport.authenticate("local",{
        //  successRedirect : "/success",
         failureRedirect : "/failure"
}), function(req, res) {
    console.log("AUTH : " + req.user);
    res.send(req.user.username);
    // res.redirect("/success");
});

// app.get("/isloggedin", function(req, res) {
//     console.log(req.user);
//     if(req.user)
//         res.send(req.user.currentUser);
//     else
//         res.send("Not logged in")
// });

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
    res.sendStatus(200);
});



app.listen(PORT, function(err){
    if(err)
        console.log(err);
    else
        console.log("Server started...");
})