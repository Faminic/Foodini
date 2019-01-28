$(document).ready(function(){
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

    $("#account-button").click(function(){
      $.get("/currentUser", function(data){
        $("#username").val(data.username)
        $("#fname").val(data.fname)
        $("#sname").val(data.sname)
        $("#password").val(data.password)
        $("#passwordC").val(data.password)
      })
    })

    $("#close-button").click(function(){
      $("#username-alert").fadeOut(100);
      $("#password-alert").fadeOut(100);
      $("#success-alert").fadeOut(100);
    })

    $("#account-form").on("submit", function() {
      $("#username-alert").fadeOut(100);
      $("#password-alert").fadeOut(100);
      $("#success-alert").fadeOut(100);
      var username = $("#username").val()
      var fname = $("#fname").val()
      var sname = $("#sname").val()
      var password = $("#password").val()
      var passwordC = $("#passwordC").val()
      if (password!=passwordC) {
        $("#password").val("")
        $("#passwordC").val("")
        $("#password-alert").delay(100).fadeIn(100);
      }
      else {
        $.post("/updateUser", {username: username, fname: fname, sname: sname, password: password}, function(data) {
          if (data=="success") {
            $("#success-alert").delay(100).fadeIn(100)
          }
          else {
            $("#username").val("")
            $("#username-alert").delay(100).fadeIn(100)
          }
        })
      }
    })

    $("#logout-button").click(function(){
      $.get("/logout")
      window.location.replace("/signup")
    })

})
