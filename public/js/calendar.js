//Kalender - Agnes
const date = new Date();

const renderCalendar = () => {
  //test för att se vad man får fram
  //const month = date.getMonth();
  //console.log(date);

  const monthDays = document.querySelector('.days');

  //test så man hamnar på rätt dag
  const lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
  //console.log(lastDay);

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayIndex = date.getDay() -1;
  //console.log(firstDayIndex);

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() +1, 0).getDay();

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
    days += `<div class = "prevDate">${prevLastDay - x + 1}</div>`
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
renderWeekCalendar();
