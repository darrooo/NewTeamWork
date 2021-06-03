//javascript connected to the calendar.html file
const date = new Date();

const renderCalendar = () => {
  //test för att se vad man får fram
  //const month = date.getMonth();
  //console.log(date);

  const monthDays = document.querySelector('.days');

  //Test så man hamnar på rätt dag
  const lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
  //console.log(lastDay);

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  //const firstDayIndex = date.getDay()-2;
  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  //const firstDayIndex = new Date(date.getDay);
//  console.log(firstDayIndex);

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() +1, 0).getDay();
//console.log(lastDayIndex);
  const nextDays = 7 - lastDayIndex;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  //"skriver" texten i h1 respektive p i calendar.html
  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = new Date().toDateString();
  //console.log(Date());

  let days = "";

  //fylla på början av månadsvyn med datumen från förra månaden
  for(let x = firstDayIndex; x > 0; x--){
    //console.log(firstDayIndex);
    days += `<div class = "prevDate">${prevLastDay - x +1}</div>`
  };

  // "lastDay" så det blr 30 vs 31 dagar på rätt månad
  for(let i = 1; i <= lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
      days += `<div class = "today">${i}</div>`;
    }
    else{
      days += `<div>${i}</div>`;
    }
  };

  //fylla på med slutet med den kommande månaden
  for(let y = 1; y <= nextDays; y++){
    days += `<div class = "nextDate">${y}</div>`;
    monthDays.innerHTML = days;
  };
}



document.querySelector('.prev').addEventListener('click', () =>{
  date.setMonth(date.getMonth()-1)
  renderCalendar();
});

document.querySelector('.next').addEventListener('click', () =>{
  date.setMonth(date.getMonth()+1)
  renderCalendar();
});

renderCalendar();


//Veckovy
const renderWeekCalendar = () => {

//  const monthDays = document.querySelector('.days');

  //test så man hamnar på rätt dag
  const lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
  //console.log(lastDay);

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() +1, 0).getDay();

   Date.prototype.getWeek = function () {
     var firstJan = new Date(this.getFullYear(), 0, 1);
     //return Math.ceil((((this - firstJan) / 86400000) + firstJan.getDay() + 1) / 7);
   return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstJan) / 86400000) + firstJan.getDay()) / 7);
 };

 var myDate = new Date("2022-01-01");
 var thisWeek = myDate.getWeek() -1; //=> 5
 //console.log(thisWeek);

// Date.prototype.getWeek = function () {
//
//   //  const today = new Date();
//     var firstDayOfYear = new Date(date.getFullYear(), 0, 1);
//     var pastDaysOfYear = (myDate - firstDayOfYear) / 86400000;
//     //return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() -1) / 7);
//     return Math.ceil((((this - firstDayOfYear) / 86400000) + firstDayOfYear.getDay() - 1) / 7);
// };
//
//  var myDate = new Date("2020-12-26");
//  //console.log(myDate);
//  var thisWeek = myDate.getWeek()-1;
//  console.log(thisWeek);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];


  //"skriver" texten i h1 respektive p i calendar.html
  document.querySelector(".weekDay h1").innerHTML = weekDays[date.getDay()-1];
  document.querySelector(".weekDay p").innerHTML = new Date().toDateString();

  let time = "";

  for(let i = 1; i <= lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
      time += `<div class = "timeNow">${i}</div>`;
    }
    else{
      time += `<div>${i}</div>`;
    }
  };
}

//  DAGSVY
//  document.querySelector(".thisDay p").innerHTML = new Date().toDateString();


// document.querySelector('.prevWeek').addEventListener('click', () =>{
//   date.setMonth(date.getMonth()-1)
//   renderWeekCalendar();
// });
//
// document.querySelector('.nextWeek').addEventListener('click', () =>{
//   date.setMonth(date.getMonth()+1)
//   renderWeekCalendar();
// });
//
// Agnes testar vecka renderWeekCalendar();


// function updateClock(){
//   var now = new Date();
//   var dname = now.getDay(),
//       mo = now.getMonth(),
//       dnum = now.getDate(),
//       yr = now.getFullYear(),
//       hou = now.getHours(),
//       min = now.getMinutes(),
//       sec = now.getSeconds(),
//       pe = "AM";
//
//       var mounts = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//       var weeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//       var ids = ["dayName", "mounthName", "dayNumber", "year", "hour", "minutes", "seconds", "period"]
//       var values = [weeek[dname], mounts[mo], dnum, yr, hou, min, sec, pe];
//
//       for(var a = 0; a < ids.length; a++)
//       document.getElementById(ids[a]).firstCild.nodeValue = values[a];
// }
//
// function initClock() {
//   updateClock();
//   windw.setInterval("updateClock()", 1);
// }
