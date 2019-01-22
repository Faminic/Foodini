$(document).ready(function(){
  $('#home-pointer').click(function(e) {
    $("#home").delay(100).fadeIn(100);
    $("#storage").fadeOut(100);
    $("#expiry").fadeOut(100);
    $("#account").fadeOut(100);
    e.preventDefault();
   })
   $('#storage-pointer').click(function(e) {
     $("#storage").delay(100).fadeIn(100);
     $("#home").fadeOut(100);
     $("#expiry").fadeOut(100);
     $("#account").fadeOut(100);
     e.preventDefault();
    })
    $('#expiry-pointer').click(function(e) {
      $("#expiry").delay(100).fadeIn(100);
      $("#storage").fadeOut(100);
      $("#home").fadeOut(100);
      $("#account").fadeOut(100);
      e.preventDefault();
     })
     $('#account-pointer').click(function(e) {
       $("#account").delay(100).fadeIn(100);
       $("#storage").fadeOut(100);
       $("#expiry").fadeOut(100);
       $("#home").fadeOut(100);
       e.preventDefault();
      })
})
