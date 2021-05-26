var socket = io();

var vm = new Vue({
  el: '#sendbuttons',
  //el1: '#hamburgerbuttons',
  data: {
    userInformation: [],
    dbID: "",
    access: false,
    allUsers: [],
  },
  //kommer från index.html login
  methods: {
    buttonClicked: function() { //från index send button
      this.userInformation = getUserInfo(); //skickas till script.js
      console.log("i methods userinformation" + this.userInformation);
      this.sendInformation();
      if(window.location == "http://localhost:3000/"){
        this.timeOutFunction();}
    },
    //skickar till app.js
    sendInformation: function(event) {
      //console.log("i mwthods send information" + event);
      console.log("i mwthods send this.userInformation" + this.userInformation);
      socket.emit("sendInformation", {
        userInfo: this.userInformation,
      });
    },
    logoutButtonClicked: function(event){
      socket.emit("sendLogout",{
        userInfo: this.userInformation,
      });
    },
    timeOutFunction: function () {
      setTimeout(function(){
         modal.style.display = "block";
       }, 100);
    },
    // ----------------------
    //här vill vi skapa en funktion som lägger till event
    // addEventButton: function(){
    //
    // }
    // ----------------------
  }
});



socket.on('sendLogin',
function(d){
  //dbID = d.userID;
  access = d.userAccess;
  allUsers = d.allCurrentUsers;
  console.log('testar om det skickas till vue_script. Access: ' + access );


//  socket.on('sendLogin', function(access){
//Vet inte hur det funkar, console log printar inte.
    if (window.location == "http://localhost:3000/" && access == true){
      window.location = "http://localhost:3000/homepage";
    }

    if(window.location == "http://localhost:3000/homepage" && access ==false){
      window.location = "http://localhost:3000/";
    }
    else if(window.location == "http://localhost:3000/myProfile" && access ==false){
      window.location = "http://localhost:3000/";
    }
    else if(window.location == "http://localhost:3000/settings" && access ==false){
      window.location = "http://localhost:3000/";
    }
    else if(window.location == "http://localhost:3000/chat" && access ==false){
      window.location = "http://localhost:3000/";
    }

  });

  // Get the modal
  var modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
