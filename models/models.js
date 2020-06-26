const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/forumDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  batch: String,
  profession: String,
});

const Member = mongoose.model("Member", memberSchema);

//Find all members
Member.find((err, members) => {
  if (err) {
    console.log(err);
  } else {
    return members;
  }
});

exports.Member = Member;