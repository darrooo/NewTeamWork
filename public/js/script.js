//Fetch users input email and password from vue_script
function getUserInfo() { 
  var email = document.getElementById("txtEmail").value;
  var password = document.getElementById("txtPassword").value;
  var arr = [email, password];
  return arr;
}
