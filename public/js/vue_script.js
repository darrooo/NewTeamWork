var socket = io();
var click =false;

var vm = new Vue({
  el: '#mapnbutton',
  data: {
    click: false,
    userInformation: [],
  },
  //kommer från index.html login
  methods: {
    buttonClicked: function() { //från index send button
      this.click = true;
      this.userInformation = getUserInfo(); //skickas till script.js
      //console.log("i methods userinformation" + this.userInformation);
      this.sendInformation();
      //if(click){
      //  window.location = "http://localhost:3000/homepage"
      //}

    },
    //skickar till app.js
    sendInformation: function(event) {
      //console.log("i mwthods send information" + event);
    //  console.log("i mwthods send this.userInformation" + this.userInformation);
      socket.emit("sendInformation", {
        userInfo: this.userInformation,
      });
    }
  }
});
