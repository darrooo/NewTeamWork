'use strict';

//sparar users
function Data(){
  this.users={};
  this.allUsers=[];
}
//var inDatabase = data.checkIfUserInDB(email, password);
Data.prototype.checkIfUserInDB= function (email, password){
  var valid = 0;
  var allUsersArray = this.getAllUsers();
  allUsersArray.forEach(element => {
    if (element.username == email) {
      valid=1;
    }
    if (element.username == email && element.password ==password) {
      valid=2;
    }
  });
  return valid;
}

Data.prototype.addUser= function (user){
    //Store the order in an "associative array" with orderinformation as key
  this.users[user.userInformation] = user; 
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
  var name= users.name;
  var name = { name: users.name, username: users.username, password: users.password};
  this.allUsers.push(name);

};

module.exports = Data;
