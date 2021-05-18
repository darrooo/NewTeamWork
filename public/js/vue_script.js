var socket = io();

var vm = new Vue({
  el: '#sendbuttons',
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
