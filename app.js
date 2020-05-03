window.addEventListener('load',myfun());
let long=0;
let lat=0;
navigator.geolocation.getCurrentPosition((position=>{

     long = position.coords.longitude;
     lat = position.coords.latitude;}));

//const funcall = document.querySelector('.myDiv');
//funcall.addEventListener = ('showPage' , 'weather');

var myVar;

function myfun() {
  myVar = setTimeout(showPage, 10000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  if(lat!=0 && long!=0)
  {
     document.getElementById("myDiv").style.display = "block";
     weather();
  }
  else
     {
          let errormsg = document.querySelector(".error");
          let msg = "We're unable to get your location :(";
          errormsg.textContent = msg;
     }
}
function weather(){
     let temperatureDescription = document.querySelector(".temperature-description");
     let temperatureDegree = document.querySelector(".temperature-degree");     
     let locationTimezone = document.querySelector(".location-timezone");
     let exact = document.querySelector(".exact-location");

     if(navigator.geolocation){
          
               const proxy = "https://cors-anywhere.herokuapp.com/";
               const locate= `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cf3aa3fa484d8f88b76c34b064eb484f`
               const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}?units=si`;
          
               fetch(api)
               .then(response =>{
                    return response.json();
               })
               .then(data =>{
                    console.log(data);
                    const {temperature , summary ,icon}= data.currently;

                    //set DOM elements from api
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;
                    temperatureDescription.textContent = summary;

                    setIcons(icon, document.querySelector('.icon1'));

               });

               fetch(locate)
               .then(response =>{
                    return response.json();
               })
               .then(data =>{
                    console.log(data);
                    const loc = data.name;

                    //set DOM elements from api
                    exact.textContent = loc;
                    
               });
          }

     function setIcons(icon,iconID){
          const skycons = new Skycons({color : "white"}); 
          const currentIcon = icon.replace(/-/g, "_").toUpperCase();
          skycons.play();
          return skycons.set(iconID, Skycons[currentIcon]);
     }
}
