loginactive();

$(".login").click(loginactive);
$(".signup").click(signupactive);

// $(".btn").click(function () {
// });

function signupactive() {
  $(".signup-form").show();
  $(".login-form").hide();
  $(".signup").addClass("current");
  $(".login").removeClass("current");
  $("#lmessage").hide();
}

function loginactive() {
  $(".signup-form").hide();
  $(".login-form").show();
  $(".login").addClass("current");
  $(".signup").removeClass("current");
  $("#smessage").hide();
}
