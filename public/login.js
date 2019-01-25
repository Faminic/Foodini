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

  $("#login-form").on("submit", function() {
    var username = $("#username").val()
    var password = $("#password").val()
    $.get("/login/people", function(data){
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        if (data[i].username == username && data[i].password == password) {
          //fade out login and fade in main webpage
        }
      }
    })
  })
})
