// Att kollegorna syns på homepage
var allColleagues = () => {

const divColleagues = document.querySelector('.myColleagues');

let myColleagues = '';

for(let colleague = 1; colleague <= 50; colleague++){
  myColleagues += `<div class = "myColleagues">${"Example colleague: "+ colleague}</div>`;
  divColleagues.innerHTML = myColleagues;
  //console.log(divColleagues);
 };
}
allColleagues();

// Dagliga kalendern på homepage
var daily = new Date();

var renderDaily = () => {

const timeHours = document.querySelector('.hours');

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

//Veckodagen för den dag som syns på dagsvyn
document.querySelector(".thisDay h1").innerHTML = weekdays[daily.getDay()-1];
//Dagens datum som visas i headern
document.querySelector(".thisDay p").innerHTML = new Date().toDateString();

let hours = '';

for(let hour = 7; hour <= 17; hour++){
  hours += `<div class = "hours">${hour}</div>`;
  timeHours.innerHTML = hours;
//  console.log(timeHours);
 };
}

document.querySelector('.prevDay').addEventListener('click', () =>{
  daily.setDate(daily.getDate()-1)
  renderDaily();
});

document.querySelector('.nextDay').addEventListener('click', () =>{
  daily.setDate(daily.getDate()+1)
  renderDaily();
});
renderDaily();

var menu = document.querySelector(".menu")
var ham = document.querySelector(".ham")
var xIcon = document.querySelector(".xIcon")
var menuIcon = document.querySelector(".menuIcon")

ham.addEventListener("click", toggleMenu)

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    xIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    xIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

var menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach(
  function (menuLink) {
    menuLink.addEventListener("click", toggleMenu)
  }
)
