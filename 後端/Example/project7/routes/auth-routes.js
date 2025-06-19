const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
router.get("/login",(req,res)=>{
  return res.render("login",{user:req.user})
})

router.get("/logout",(req,res)=>{
  req.logOut((err)=>{
    if(err) return res.send(err);
    return res.redirect("/")
  })
});

router.get("/signup",(req,res)=>{
  return res.render("signup",{user: req.user})
})

// POST /signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check password length
  if (password.length < 8) {
    req.flash("error_msg", "Password must be at least 8 characters long");
    return res.redirect("/auth/signup");
  }

  try {
    // Check if the email is already registered
    const foundEmail = await User.findOne({ email });

    if (foundEmail) {
      req.flash(
        "error_msg",
        "The email is already registered. Please use a different email or try logging in with this email!"
      );
      return res.redirect("/auth/signup");
    }

    // Hash the password and create a new user
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    req.flash("success_msg", "Successfully registered! You can now log in.");
    return res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "An error occurred. Please try again.");
    return res.redirect("/auth/signup");
  }
});


router.post("/login", passport.authenticate("local", {
  failureRedirect: "/auth/login",
  failureFlash: "Login failed: Incorrect username or password!"
}),
   (req,res)=>{
    return res.redirect("/profile");
   }
);

router.get('/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get('/google/redirect', passport.authenticate("google"), (req, res) => {
  console.log("enter redirect!")
  return res.redirect("/profile");
});

module.exports = router;