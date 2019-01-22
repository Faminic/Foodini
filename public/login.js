$(document).ready(function(){
  $('#backLogin-button').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    e.preventDefault();
   })
  $("#goRegister-button").click(function(e){
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    e.preventDefault();
  })
})
