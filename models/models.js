const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const faker = require("faker");
const Bcrypt = require("bcryptjs");
const professions = require("./professions");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  googleId: String,
  batch: String,
  profession: String,
  lastlogin: Date,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          googleId: profile.id,
          email: profile.email,
          username: profile.given_name,
          name: profile.displayName,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

//create 15 random members
let memberlist = [];
for (let i = 0; i < 15; i += 1) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const year = faker.random.number({
    min: 2015,
    max: new Date().getFullYear(),
  });
  let newMember = {
    name: firstName + " " + lastName,
    email: faker.internet.email(firstName, lastName),
    batch: year + "-" + (year + 3),
    profession: professions[Math.floor(Math.random() * professions.length)],
    password: Bcrypt.hashSync(faker.internet.password(), 10),
  };
  memberlist.push(newMember);
}

User.countDocuments({}, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    if (result === 0) {
      User.insertMany(memberlist);
    }
  }
});

exports.User = User;
