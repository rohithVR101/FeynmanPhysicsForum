signupactive();

$(".login").click(loginactive);
$(".signup").click(signupactive);

$(".btn").click(function () {
    $(".input").val("");
});

function signupactive() {
    $(".signup-form").show();
    $(".login-form").hide();
    $(".signup").addClass("current");
    $(".login").removeClass("current");
}

function loginactive() {
    $(".signup-form").hide();
    $(".login-form").show();
    $(".login").addClass("current");
    $(".signup").removeClass("current");
}