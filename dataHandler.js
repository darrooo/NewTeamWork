'use strict';
//DataHandler is used for storing information gathered from the database
//The function data stores the current user, all users and events in the database.
//It also does the authorisation of the logged in user.
function Data(){
  this.users={};
  this.allUsers=[];
  this.allEvents=[];
}
//authorisation of users
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
// adds the current user to this users.
Data.prototype.addUser= function (user){
  this.users[user.userInformation] = user;
  var email= Object.values(this.users)[0].userInfo[0];
  var password = Object.values(this.users)[0].userInfo[1];
  var loginArray = [email, password];
  return loginArray
}
// returns all users currently downloaded
Data.prototype.getAllUsers = function () {
  return this.allUsers;
};
// returns all the events currently downloaded
Data.prototype.getAllEvents = function () {
  return this.allEvents;
};

// adds users from database to datahandler
Data.prototype.addUserInData = function (users) {
    var name= users.name;
    var name = { name: users.name, username: users.username, password: users.password, project: users.project, admin: users.admin, image:users.image};
    this.allUsers.push(name);
};
// adds events from database to datahandler
Data.prototype.addEventInData = function (events) {
    var userEvent = events.username;
    var userEvent = {username: events.username, eventname: events.eventname, starttime: events.starttime, endtime: events.endtime, date:events.date, month:events.month, year:events.year};
    this.allEvents.push(userEvent);
};
// exports to app.js
module.exports = Data;
