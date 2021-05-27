//Fetch users input email and password
function getUserInfo() { //läser in input från
  var email = document.getElementById("txtEmail").value;
  var password = document.getElementById("txtPassword").value;
  var arr = [email, password];
  return arr;
}
