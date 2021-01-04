const flipCard = document.querySelector('.flip-card');
const nextDays = document.querySelector('.next-five-days');

window.addEventListener('load', myfun());

var myVar;
var flag = 0;


function myfun() {
     
     flipCard.style.display = "none";
     myVar = setTimeout(showPage, 1);
     var today = new Date();
     var h = today.getHours();
     if(h>=5 && h<=7)
         document.body.style.backgroundImage = "url('./assets/sunrise.svg')";
     else if(h>=8 && h<=17)
          document.body.style.backgroundImage = "url('./assets/day-sky.svg')";
     else if(h>=18 && h<=19)
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
     
     const days=["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
     const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
     if (navigator.geolocation) {

          const proxy = "https://cors-anywhere.herokuapp.com/";
          const locate = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cf3aa3fa484d8f88b76c34b064eb484f`
          const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}?units=si`;

          fetch(locate)
               .then(response => {
                    return response.json();
               })
               .then(data => {
               //     console.log(data);
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
                 //   console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    const dailyData = data.daily.data;
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;
                    temperatureDescription.textContent = summary;

                    var today = new Date();
                    var tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate()+1);
                    var dayAfterTom = new Date(tomorrow);
                    dayAfterTom.setDate(dayAfterTom.getDate()+1);
                   // console.log(dayAfterTom);
                var dayAfter = new Date(dayAfterTom);
                dayAfter.setDate(dayAfter.getDate()+1);
                    var dates=[tomorrow,dayAfterTom,dayAfter];  
                    var i;
                    if (flag == 0) {
                         for (i = 0; i < 3; i++) {
                              const dailyTemp = document.createElement("div");
                              const day = document.createElement("h3");
                              const desc = document.createElement("div");;
                              desc.classList.add("desc");
                              const dailyTempDesc = document.createElement("h3");
                              const dailyTempIcon = document.createElement("canvas");
                              
                              const highLow = document.createElement("div");
                            
                              const highTemp = document.createElement("h4");
                              const lowTemp = document.createElement("h4");
                              const sep = document.createElement("hr");
                              sep.classList.add("separator");
                              day.innerHTML=days[dates[i].getDay()] + ', ' + dates[i].getDate() + ' ' + months[dates[i].getMonth()];
                              dailyTempDesc.innerHTML = dailyData[i].summary;
                              dailyTempIcon.style.height="4vh";
                              setIcons(icon,dailyTempIcon);
                              highTemp.innerHTML ="↑  " + dailyData[i].temperatureHigh + " ";
                              lowTemp.innerHTML ="↓  " + dailyData[i].temperatureLow + " ";
                              
                              dailyTemp.appendChild(day);
                              dailyTemp.appendChild(desc);
                              desc.appendChild(dailyTempIcon);
                              desc.appendChild(dailyTempDesc);
                              
                              highLow.appendChild(highTemp);
                              highLow.appendChild(lowTemp);
                              dailyTemp.appendChild(highLow);
                              if(i!=2)
                              dailyTemp.appendChild(sep);
                              
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
