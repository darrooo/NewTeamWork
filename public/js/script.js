
//hämtar användarens input email och lösenord
function getUserInfo() { //läser in input från
  var email = document.getElementById("txtEmail").value;
  var password = document.getElementById("txtPassword").value;
  var arr = [email, password];
//  console.log("arrayen i script.js" + arr);
  return arr;
}
