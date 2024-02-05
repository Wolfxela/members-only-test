require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const expressLayouts = require("express-ejs-layouts")
const User = require("./models/user_model")
const mongoose = require('mongoose')
const socialRouter = require('./routes/social')
const bcrypt = require('bcrypt')
const compression = require('compression')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const limit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,

})
const app = express();
main().catch((err=>{console.log(err)}))
async function main(){
  await mongoose.connect(process.env.DB,{dbName:"members-only"}).then(x => console.log(`Connected the Database: "${x.connections[0].name}"`))
}
// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

passport.use(new localStrategy(async(username,password,done)=>{
  try{
    const user = await  User.findOne({username:username})
    if(!user){
      return done(null,false,{message:"incorrect username"})
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password"})
    }
    return done(null,user)
  }catch(err){return done(err)}
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});
app.use(compression())
app.use(limit)
app.use(helmet())
app.use(expressLayouts)
app.use(session({secret:"cats",resave:false,saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  res.locals.currentUser = req.user
next()})

app.post('/log-in',passport.authenticate("local",{successRedirect:"/",failureRedirect:"/"}))
app.post('/log-out',(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      return next(err)
    }
    res.redirect("/")
  })
})
app.get('/', (req,res)=>{
  res.redirect("/social")
});

app.use('/social',socialRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
