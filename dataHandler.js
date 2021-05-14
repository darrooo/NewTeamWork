'use strict';

//sparar users
function Data(){
  this.users={};
  this.allUsers=[];
}
Data.prototype.addUser= function (user){
    //Store the order in an "associative array" with orderinformation as key
  this.users[user.userInformation] = user; //user.userinformation är en array från script.js
//  console.log(Object.values(this.users)[0].userInfo[0]); //Email
//  console.log(Object.values(this.users)[0].userInfo[1]); //psw
  var email= Object.values(this.users)[0].userInfo[0];
  var password = Object.values(this.users)[0].userInfo[1];
  var loginArray = [email, password];
  return loginArray
   //kör om main för att uppdatera email och password globalt
}
// om vi av någon anledning ska se alla användare, vet ej om den kommer behövas
Data.prototype.getAllUsers = function () {
  return this.allUsers;
};

Data.prototype.addUserInData = function (users) {
  //console.log(users)
  //console.log(users.name)
  //this.users[user.userInformation] = user;
  var name= users.name;
  var name = { name: users.name, username: users.username, password: users.password};
  var allUsersArray = [];
  allUsersArray = this.allUsers;
  allUsersArray.push(name);
  //console.log(this.allUsers);
//  console.log("array . " + allUsersArray);

};
module.exports = Data;
