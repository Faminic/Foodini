$(document).ready(function(){

  $('#backLogin-button').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $("#register-alert-username").fadeOut(100);
    $("#register-alert-password").fadeOut(100);
    $("#usernameR").val("")
    $("#fname").val("")
    $("#sname").val("")
    $("#passwordR").val("")
    $("#passwordC").val("")
    e.preventDefault();
   })

  $("#goRegister-button").click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $("#login-alert").fadeOut(100);
    $("#register-success").fadeOut(100);
    $("#username").val("")
    $("#password").val("")
    e.preventDefault();
  })

  $("#login-form").on("submit", function() { //need to add sessions as well
    $("#login-alert").fadeOut(100);
    $("#register-success").fadeOut(100);
    var username = $("#username").val()
    var password = $("#password").val()
    $.get("/login/people", function(data){
      var found = false
      for (var i = 0; i < data.length; i++) {
        if (data[i].username == username && data[i].password == password) {
          found = true
          $.post("/login", {username: username, password: password}, function(data){
            if(data=="success") {
              window.location.replace("/home")
            }
          })
          break
        }
      }
      if(found==false){
        $("#username").val("")
        $("#password").val("")
        $("#login-alert").delay(100).fadeIn(100);
      }
    })
  })

  $("#register-form").on("submit", function() {
    $("#register-alert-username").fadeOut(100);
    $("#register-alert-password").fadeOut(100);
    var usernameR = $("#usernameR").val()
    var fname = $("#fname").val()
    var sname = $("#sname").val()
    var passwordR = $("#passwordR").val()
    var passwordC = $("#passwordC").val()
    if (passwordR!=passwordC) {
      $("#passwordR").val("")
      $("#passwordC").val("")
      $("#register-alert-password").delay(100).fadeIn(100);
    }
    else {
      $.ajax({
        url: "/people",
        type: "POST",
        async: true,
        data: {
                username: usernameR,
                forename: fname,
                surname: sname,
                password: passwordR,
                access_token: "concertina" //just keep this for now
              },
        success: function(data){
          $("#login-form").delay(100).fadeIn(100);
          $("#register-success").delay(100).fadeIn(100);
          $("#register-form").fadeOut(100);
          $("#username").val(usernameR)
          $("#password").val(passwordR)

        },
        error: function(xhr, status, error){
          $("#register-alert-username").delay(100).fadeIn(100);
          $("#usernameR").val("")
        }
      })
    }
  })

})
