const mongoose = require("mongoose");
const faker = require("faker");
const Bcrypt = require("bcryptjs");
const professions = require("./professions");

mongoose.connect(
  "mongodb+srv://admin:bB0Ik0lzLq4lBT7m@cluster0-ev8dt.mongodb.net/forumDB?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  batch: String,
  profession: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Member = mongoose.model("Member", memberSchema);
const User = mongoose.model("User", userSchema);

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
  };
  memberlist.push(newMember);
}

Member.countDocuments({}, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    if (result === 0) {
      Member.insertMany(memberlist);
    }
  }
});

//create admin login
let admin = new User({
  username: "admin",
  email: "admin@123.com",
  password: Bcrypt.hashSync("admin", 10),
});

User.countDocuments({}, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
    if (result === 0) {
      admin.save();
    }
  }
});

exports.Member = Member;
exports.User = User;
