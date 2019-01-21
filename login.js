$(document).ready(function(){
  $('#login-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $("#login-link").css("color", "#0E6655");
    $("#login-link").css("font-size", "18px");
    $("#register-link").css("color", "#34495E");
    $("#register-link").css("font-size", "13px");
    e.preventDefault();
   })
  $("#register-link").click(function(e){
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $("#register-link").css("color", "#0E6655");
    $("#register-link").css("font-size", "18px");
    $("#login-link").css("color", "#34495E");
    $("#login-link").css("font-size", "13px");
    e.preventDefault();
  })
})
