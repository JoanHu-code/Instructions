const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20")
const User = require("../models/user-model");
const userModel = require("../models/user-model");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done)=>{
   console.log("Serialize User....")
   done(null, user._id); // Save the MongoDB id in the session, and sign the id before sending it to the user as a cookie.
});
passport.deserializeUser(async (_id,done)=>{
   console.log("Deserialize User... Use the id saved by serializeUser to find the data in the database");
   let foundUser = await User.findOne({ _id });
   done(null,foundUser)
})
passport.use(new GoogleStrategy(
  {
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL:"/auth/google/redirect",
  },
  async (accessToken, refreshToken, profile, done) => {
   console.log("Entered the Google Strategy section!");
   // console.log(profile);
   // console.log("============================");
   let foundUser = await userModel.findOne({googleID: profile.id}).exec();
   if(foundUser){
      console.log("This user is already registered.");
      done(null,foundUser)
   }else{
      console.log("A new user has been detected!");
      let newUser = new User({
         name: profile.displayName,
         googleID: profile.id,
         thumbnail: profile.photos[0].value,
         email: profile.emails[0].value,
      });
      let saveUser = await newUser.save();
      console.log("Successfully created a new user");
      done(null,saveUser);
   }
  }
 )
);

passport.use(new LocalStrategy(async (username, password, done) => {
   // Search for user by email
   let foundUser = await User.findOne({ email: username });
 
   if (foundUser) {
     // Compare entered password with hashed password
     let result = await bcrypt.compare(password, foundUser.password);
 
     if (result) {
       // Password is correct, proceed with login
       done(null, foundUser);
     } else {
       // Password is incorrect
       done(null, false);
     }
   } else {
     // No user found with that email
     done(null, false);
   }
 }));