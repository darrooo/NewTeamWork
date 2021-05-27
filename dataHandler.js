'use strict';

//sparar users
function Data(){
  this.users={};
  this.allUsers=[];
  this.allEvents=[];
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

Data.prototype.getAllEvents = function () {
  return this.allEvents;
};

Data.prototype.addUserInData = function (users) {
//  if (this.allUsers[0].name != users.name) {
    //console.log( users.name + " är tillagd i databasen" );
    var name= users.name;
    var name = { name: users.name, username: users.username, password: users.password, project: users.project, admin: users.admin};
    this.allUsers.push(name);
    //console.log("this.allUsers[0].name: "+  Object.values(this.allUsers)[0].name + " users.name: "+ users.name);

  //}
};
Data.prototype.addEventInData = function (events) {
//  if (this.allUsers[0].name != users.name) {
    console.log( events.username +" "+ events.eventname +" "+ events.starttime +" "+ events.endtime + events.date+" är hämtad från databasen" );
    var userEvent = events.username;
    var userEvent = {username: events.username, eventname: events.eventname, starttime: events.starttime, endtime: events.endtime, date:events.date};
    this.allEvents.push(userEvent);
    //console.log("this.allUsers[0].name: "+  Object.values(this.allUsers)[0].name + " users.name: "+ users.name);

  //}
};

module.exports = Data;
