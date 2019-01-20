$(document).ready(function(){
  $('#login-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
   })
  $("#register-link").click(function(e){
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  })
})
