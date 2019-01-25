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
          $("#home-page").delay(100).fadeIn(100);
          $("#login-page").fadeOut(100);
          //add a loading screen and more delay
          //also add a notification during loading that login was successful
          $(document).attr("title", "Foodini - Good Food, Good Mood")
        }
      }
    })
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
