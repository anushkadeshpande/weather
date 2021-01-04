const flipCard = document.querySelector('.flip-card');
const nextDays = document.querySelector('.next-five-days');

window.addEventListener('load', myfun());

var myVar;
var flag = 0;


function myfun() {
     flipCard.style.display = "none";
     myVar = setTimeout(showPage, 1);
    // var today = new Date();
     //var h = today.getHours();
     var h=5;
     if(h>=5 && h<=7)
         document.body.style.backgroundImage = "url('./assets/sunrise.svg')";
     else if(h>=8 && h<=16)
          document.body.style.backgroundImage = "url('./assets/day-sky.svg')";
     else if(h>=17 && h<=19)
          document.body.style.backgroundImage = "url('./assets/twilight.svg')";
     else
          document.body.style.backgroundImage = "url('./assets/night-sky.svg')";
}

function showPage() {
     let long = 0;
     let lat = 0;

     navigator.geolocation.getCurrentPosition((position => {

          long = position.coords.longitude;
          lat = position.coords.latitude;
          if (lat != 0 && long != 0) {
               weather(lat, long);
          }
          else {
               let errormsg = document.querySelector(".error");
               let msg = "We're unable to get your location :(";
               errormsg.textContent = msg;
          }
     }));


}
function weather(lat, long) {
     let temperatureDescription = document.querySelector(".temperature-description");
     let temperatureDegree = document.querySelector(".temperature-degree");
     let locationTimezone = document.querySelector(".location-timezone");
     let exact = document.querySelector(".exact-location");
     let i = 0;
     let hourly = document.querySelector(".hourly");
     if (navigator.geolocation) {

          const proxy = "https://cors-anywhere.herokuapp.com/";
          const locate = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cf3aa3fa484d8f88b76c34b064eb484f`
          const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}?units=si`;

          fetch(locate)
               .then(response => {
                    return response.json();
               })
               .then(data => {
                    console.log(data);
                    const loc = data.name;

                    //set DOM elements from api
                    exact.textContent = loc;
                    document.getElementById("loader").style.display = "none";
                    flipCard.style.display = "block";
               });
          fetch(api)
               .then(response => {
                    return response.json();
               })
               .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    const dailyData = data.daily.data;
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;
                    temperatureDescription.textContent = summary;

                    var i;
                    if (flag == 0) {
                         for (i = 0; i < 5; i++) {
                              const dailyTemp = document.createElement("p");
                              var dailyDisplay = dailyData[i].summary;
                              dailyTemp.innerHTML = dailyDisplay;
                              nextDays.appendChild(dailyTemp);
                         }
                         flag = 1;
                    }
                    setIcons(icon, document.querySelector('.icon1'));

               });
     }

     function setIcons(icon, iconID) {
          const skycons = new Skycons({ color: "white" });
          const currentIcon = icon.replace(/-/g, "_").toUpperCase();
          skycons.play();
          return skycons.set(iconID, Skycons[currentIcon]);
     }
}
function time() {
     var today = new Date();
     var h = today.getHours()
     if (h > 12) { h = h - "12" };
     var m = today.getMinutes();
     var s = today.getSeconds();
     m = checkTime(m);
     s = checkTime(s);
     document.getElementById('clocky').innerHTML =
          h + ":" + m + ":" + s;

     var t = setTimeout(time, 500);
}
function checkTime(i) {
     if (i < 10) { i = "0" + i };
     return i;
}