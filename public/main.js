$(document).ready(function(){

  $('#backLogin-button').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    e.preventDefault();
   })

  $("#goRegister-button").click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    e.preventDefault();
  })

  $("#login-form").on("submit", function() { //need to add sessions as well
    var username = $("#username").val()
    var password = $("#password").val()
    $.get("/login/people", function(data){
      var found = false
      for (var i = 0; i < data.length; i++) {
        if (data[i].username == username && data[i].password == password) {
          found = true
          $("#home-page").delay(100).fadeIn(100);
          $("#login-page").fadeOut(100);
          //add a loading screen and more delay
          //also add a notification during loading that login was successful
          $(document).attr("title", "Foodini - Good Food, Good Mood")
        }
      }
      if(found==false){
        //send user notification that the given username or password do not associate to any user
      }
    })
  })

  $("#register-form").on("submit", function() { 
    var usernameR = $("#usernameR").val()
    var fname = $("#fname").val()
    var sname = $("#sname").val()
    var passwordR = $("#passwordR").val()
    var passwordC = $("#passwordC").val()
    if (passwordR!=passwordC) {
      //send user notification that passwordC is wrong
      $("#passwordR").val("")
      $("#passwordC").val("")
    }
    else {
      $.post("/people",
      {
        username: usernameR,
        forename: fname,
        surname: sname,
        password: passwordR,
        access_token: "concertina" //just keep this for now
      },
      function(data) {
        //have to fix the two statements below inside the if statements ->they don't work
        if (status == "403") {
          //send user notification that he doesnt have permission
        }
        else if (status == "400") {
          //send user notification that username has already been taken
        }
        else {
          //let user know that the registration was successful
          $("#login-form").delay(100).fadeIn(100);
          $("#register-form").fadeOut(100);
        }
      })
    }
  })

  $('#home-pointer').click(function(e) {
    $("#home").delay(100).fadeIn(100);
    $("#storage").fadeOut(100);
    $("#expiry").fadeOut(100);
    $("#account").fadeOut(100);
    $("#home-pointer").css("color", "#FFFFFF").css("font-weight", "Bold");
    $("#storage-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
    $("#expiry-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
    $("#account-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
    e.preventDefault();
   })

   $('#storage-pointer').click(function(e) {
     $("#storage").delay(100).fadeIn(100);
     $("#home").fadeOut(100);
     $("#expiry").fadeOut(100);
     $("#account").fadeOut(100);
     $("#storage-pointer").css("color", "#FFFFFF").css("font-weight", "Bold");
     $("#home-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
     $("#expiry-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
     $("#account-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
     e.preventDefault();
    })

    $('#expiry-pointer').click(function(e) {
      $("#expiry").delay(100).fadeIn(100);
      $("#storage").fadeOut(100);
      $("#home").fadeOut(100);
      $("#account").fadeOut(100);
      $("#expiry-pointer").css("color", "#FFFFFF").css("font-weight", "Bold");
      $("#storage-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
      $("#home-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
      $("#account-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
      e.preventDefault();
     })

     $('#account-pointer').click(function(e) {
       $("#account").delay(100).fadeIn(100);
       $("#storage").fadeOut(100);
       $("#expiry").fadeOut(100);
       $("#home").fadeOut(100);
       $("#account-pointer").css("color", "#FFFFFF").css("font-weight", "Bold");
       $("#storage-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
       $("#expiry-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
       $("#home-pointer").css("color", "rgba(255,255,255,.5)").css("font-weight", "Normal");
       e.preventDefault();
      })
})
