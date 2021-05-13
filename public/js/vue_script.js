var socket = io();
var click =false;

var vm = new Vue({
  el: '#sendbuttons',
  data: {
    click: false,
    userInformation: [],
    dbID: "",
    access: false,
  },
  //kommer från index.html login
  methods: {
    buttonClicked: function() { //från index send button
      this.click = true;
      this.userInformation = getUserInfo(); //skickas till script.js
      //console.log("i methods userinformation" + this.userInformation);
      this.sendInformation();
    },
    //skickar till app.js
    sendInformation: function(event) {
      //console.log("i mwthods send information" + event);
    //  console.log("i mwthods send this.userInformation" + this.userInformation);
      socket.emit("sendInformation", {
        userInfo: this.userInformation,
      });
    },
    logoutButtonClicked: function(event){
      socket.emit("sendLogout",{
        userInfo: this.userInformation,
      });
    }
  }
});
  //BAJS E DETTASAAA
  socket.on('sendLogin',
  function(d){
    dbID = d.userID;
    access = d.userAccess;
    console.log('testar om det skickas till vue_script. Access: ' + access + "användar id är: "+ dbID);
    if (window.location == "http://localhost:3000/" && access == true){
      window.location = "http://localhost:3000/homepage";
    }
    if(window.location == "http://localhost:3000/homepage" && access ==false){
      window.location = "http://localhost:3000/";

    }
  });
