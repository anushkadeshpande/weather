window.addEventListener('load', myfun());
let long = 0;
let lat = 0;
navigator.geolocation.getCurrentPosition((position => {

     long = position.coords.longitude;
     lat = position.coords.latitude;
}));

//const funcall = document.querySelector('.myDiv');
//funcall.addEventListener = ('showPage' , 'weather');

var myVar;

function myfun() {
     myVar = setTimeout(showPage, 10000);
}

function showPage() {
     document.getElementById("loader").style.display = "none";
     if (lat != 0 && long != 0) {
          document.getElementById("myDiv").style.display = "block";
          weather();
     }
     else {
          let errormsg = document.querySelector(".error");
          let msg = "We're unable to get your location :(";
          errormsg.textContent = msg;
     }
}
function weather() {
     let temperatureDescription = document.querySelector(".temperature-description");
     let temperatureDegree = document.querySelector(".temperature-degree");
     let locationTimezone = document.querySelector(".location-timezone");
     let exact = document.querySelector(".exact-location");
     let i=0;
     let hourly=document.querySelector(".hourly");
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
              
          });
          fetch(api)
               .then(response => {
                    return response.json();
               })
               .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    const hour = data.hourly.data;
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;
                    temperatureDescription.textContent = summary;
                    console.log(hour);
                    setIcons(icon, document.querySelector('.icon1'));

               });

          
     }

     function setIcons(icon, iconID) {
          const skycons = new Skycons({ color: "black" });
          const currentIcon = icon.replace(/-/g, "_").toUpperCase();
          skycons.play();
          return skycons.set(iconID, Skycons[currentIcon]);
     }
}
function time(){
     var today = new Date();
     var h = today.getHours()
     if (h>12) {h= h- "12"} ;
     var m = today.getMinutes();
     var s = today.getSeconds();
     m = checkTime(m);
     s = checkTime(s);
     document.getElementById('clocky').innerHTML =
     h + ":" + m + ":" + s;
     
     var t = setTimeout(time, 500);
     }
     function checkTime(i) {
     if (i < 10) {i = "0" + i};
     return i;
     }