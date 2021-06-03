var socket = io();
// The vue script is used to get information added into the login field and send logout and login to other pages.
var vm = new Vue({
  el: '#sendbuttons',
  data: {
    userInformation: [],
    access: false,
    allUsers: [],
  },

  methods: {
    //activated when pressing login on index page.
    buttonClicked: function() { //från index send button
      this.userInformation = getUserInfo(); //skickas till script.js
      this.sendInformation();
      if(window.location == "http://localhost:3000/"){
        this.timeOutFunction();}
    },
    //sends information to app.js
    sendInformation: function(event) {
      //console.log("i mwthods send information" + event);
      console.log("i mwthods send this.userInformation" + this.userInformation);
      socket.emit("sendInformation", {
        userInfo: this.userInformation,
      });
    },
    //sends information about logout to app.js
    logoutButtonClicked: function(event){
      socket.emit("sendLogout",{
        userInfo: this.userInformation,
      });
    },
    //delays popup
    timeOutFunction: function () {
      setTimeout(function(){
         modal.style.display = "block";
       }, 100);
    },
  }
});


//gets information from app.js. redirects to the index page when logged out.
socket.on('sendLogin',
function(d){
  access = d.userAccess;
  allUsers = d.allCurrentUsers;

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

  //popup that shows up when the wrong login information has ben entered
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
