$(document).ready(function(){

  var itemCount = 0

  var expiryOld = true
  var buyOld = true

  $.get("/userItems", function(data){
    var allItems = data
    startHome(allItems)
    startExpiry("expiry","old", allItems)
  })

  $("#sort-by-buy").click(function(){
    removeAllCards("expiry")
    if(buyOld) {
      $.get("/userItems", function(data){
        var allItems = data
        startExpiry("buy","recent", allItems)
      })
      buyOld = false
    }
    else {
      $.get("/userItems", function(data){
        var allItems = data
        startExpiry("buy","old", allItems)
      })
      buyOld = true
    }
  })

  $("#sort-by-expiry").click(function(){
    removeAllCards("expiry")
    if(expiryOld) {
      $.get("/userItems", function(data){
        var allItems = data
        startExpiry("expiry","recent", allItems)
      })
      expiryOld = false
    }
    else {
      $.get("/userItems", function(data){
        var allItems = data
        startExpiry("expiry","old", allItems)
      })
      expiryOld = true
    }
  })

  function startExpiry(option1, option2, items) {  //insert buy or expiry for option1, recent or old for option2,
    var allItems = items
    itemCount = 0
    if (option1 == "expiry") {
      allItems.sort(function(a, b) {
          a = new Date(a.expiry);
          b = new Date(b.expiry);
          return a>b ? -1 : a<b ? 1 : 0;
      });
    }
    else {
      allItems.sort(function(a, b) {
          a = new Date(a.buy);
          b = new Date(b.buy);
          return a>b ? -1 : a<b ? 1 : 0;
      });
    }

    if(option2 == "old"){
      allItems.reverse()
    }

    for (var i = 0; i < allItems.length; i++) {
      itemCount = itemCount + 1
      var m = new Date(allItems[i].buy.toString());
      var dateBuy =
          ("0" + m.getUTCDate()).slice(-2) + "/" +
          ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
          m.getUTCFullYear()
      m = new Date(allItems[i].expiry.toString());
      var dateExpiry =
          ("0" + m.getUTCDate()).slice(-2) + "/" +
          ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
          m.getUTCFullYear()
      addItemCard("expiry-row",'div',"itemExpiry" + itemCount, '<div class="card" id="itemExpiryCard'+ itemCount +'"> <div class="card-header">' + allItems[i].name + '</div> <div class="card-body"> <p>Quantity: ' + allItems[i].quantity + '</p> <p>Date Bought: ' + dateBuy + '</p> <p>Expiry Date: ' + dateExpiry + '</p> <p>Storage: ' + allItems[i].storage + '</p> <p>Additional Comments:</p> <textarea class="comment box" rows="4" cols="20" readonly>' + allItems[i].note + '</textarea> </div> </div>')

      var today = new Date()
      if (today>=m) {
        $("#itemExpiryCard"+itemCount).css({"border":"5px solid", "border-color":"#E74C3C"})
      }
    }
  }

  function startHome(items) {
    var allItems = items
    for (var i = 0; i < allItems.length; i++) {
      itemCount = itemCount + 1
      var m = new Date(allItems[i].buy.toString());
      var dateBuy =
          ("0" + m.getUTCDate()).slice(-2) + "/" +
          ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
          m.getUTCFullYear()
      m = new Date(allItems[i].expiry.toString());
      var dateExpiry =
          ("0" + m.getUTCDate()).slice(-2) + "/" +
          ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
          m.getUTCFullYear()
      addItemCard("home-row",'div',"itemHome" + itemCount, '<div class="card" id="itemHomeCard'+ itemCount +'"> <div class="card-header">' + allItems[i].name + '</div> <div class="card-body"> <p>Quantity: ' + allItems[i].quantity + '</p> <p>Date Bought: ' + dateBuy + '</p> <p>Expiry Date: ' + dateExpiry + '</p> <p>Storage: ' + allItems[i].storage + '</p> <p>Additional Comments:</p> <textarea class="comment box" rows="4" cols="20" readonly>' + allItems[i].note + '</textarea> </div> </div>')
    }
  }

  function removeAllCards(page) { //insert home,storage or expiry
    var element
    if(page == "home") {
      for (var i = 0; i < itemCount; i++) {
        element = document.getElementById("itemHome"+(i+1))
        element.parentNode.removeChild(element)
      }
    }
    else if (page == "storage") {
      for (var i = 0; i < itemCount; i++) {
        element = document.getElementById("itemStorage"+(i+1))
        element.parentNode.removeChild(element)
      }
    }
    else {
      for (var i = 0; i < itemCount; i++) {
        element = document.getElementById("itemExpiry"+(i+1))
        element.parentNode.removeChild(element)
      }
    }
  }

  function addNewItemCard(item){
    var addItem = item
    itemCount = itemCount + 1
    var m = new Date(addItem.buy.toString());
    var dateBuy =
        ("0" + m.getUTCDate()).slice(-2) + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        m.getUTCFullYear()
    m = new Date(addItem.expiry.toString());
    var dateExpiry =
        ("0" + m.getUTCDate()).slice(-2) + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        m.getUTCFullYear()
    addItemCard("home-row",'div',"itemHome" + itemCount, '<div class="card" id="itemHomeCard'+ itemCount +'"> <div class="card-header">' + addItem.name + '</div> <div class="card-body"> <p>Quantity: ' + addItem.quantity + '</p> <p>Date Bought: ' + dateBuy + '</p> <p>Expiry Date: ' + dateExpiry + '</p> <p>Storage: ' + addItem.storage + '</p> <p>Additional Comments:</p> <textarea class="comment box" rows="4" cols="20" readonly>' + addItem.note + '</textarea> </div> </div>')

    for (var i = 0; i < itemCount-1; i++) {
      element = document.getElementById("itemExpiry"+(i+1))
      element.parentNode.removeChild(element)
    }
    $.get("/userItems", function(data){
      var allItems = data
      startExpiry("expiry","old", allItems)
    })

  }

  //addElement("home-row",'div',"test", '<div class="card"> <div class="card-header"> Title1 </div> <div class="card-body"> <p>Quantity: 1</p> <p>Date Buy: 1</p> <p>Date Expired: 1</p> <p>Storage: 1</p> <p>Additional Comments:</p> <textarea class="comment box" rows="4" cols="20" readonly></textarea> </div> </div>')


  function addItemCard(parentId, elementTag, elementId, html) {
    var x = document.getElementById(parentId)
    var newElement = document.createElement(elementTag)
    newElement.setAttribute("id", elementId)
    newElement.setAttribute("class", "col-lg-4 col-md-6 pb-5")
    newElement.innerHTML = html
    x.appendChild(newElement)
  }

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



    $("#addItem-form").on("submit", function() {
      $("#success-item-alert").fadeOut(100);
      $("#item-name-taken").fadeOut(100);
      var itemName = $("#itemName").val()
      var itemQuantity = $("#itemQuantity").val()
      var itemStorage = $("#itemStorage").val()
      var itemBuy = $("#itemBuy").val()
      var itemExpiry = $("#itemExpiry").val()
      var itemNote = $("#itemNote").val()
      $.post("/addItem", {name: itemName, quantity: itemQuantity, storage: itemStorage, buy: itemBuy, expiry: itemExpiry, note: itemNote}, function(data) {
        if(data=="success") {
          $("#success-item-alert").delay(100).fadeIn(100)
          addNewItemCard({name: itemName, quantity: itemQuantity, storage: itemStorage, buy: itemBuy, expiry: itemExpiry, note: itemNote})
        }
        else {
          $("#item-name-taken").delay(100).fadeIn(100)
        }
      })
    })

    $("#add-item-button").click(function(){
      $("#itemName").val("")
      $("#itemQuantity").val("")
      $("#itemStorage").val("")
      $("#itemBuy").val("")
      $("#itemExpiry").val("")
      $("#itemNote").val("")
      $("#success-item-alert").fadeOut(100);
      $("#item-name-taken").fadeOut(100);
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
