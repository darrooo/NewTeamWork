'use strict';

//sparar users
function Data(){
  this.users={};
}
Data.prototype.addUser= function (user){
    //Store the order in an "associative array" with orderinformation as key
  this.users[user.userInformation] = user;
//  console.log(Object.values(this.users)[0].userInfo[0]); //Email
//  console.log(Object.values(this.users)[0].userInfo[1]); //psw
  var emails= Object.values(this.users)[0].userInfo[0];
  var passwords = Object.values(this.users)[0].userInfo[1];
  var loginArray = [emails, passwords];
  return loginArray
   //kör om main för att uppdatera email och password globalt
}
// om vi av någon anledning ska se alla användare, vet ej om den kommer behövas
Data.prototype.getAllUsers = function () {
  return this.users;
};

module.exports = Data;
