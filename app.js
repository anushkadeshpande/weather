window.addEventListener('load',()=>{
     let long;
     let lat;
     let temperatureDescription = document.querySelector(".temperature-description");
     let temperatureDegree = document.querySelector(".temperature-degree");     
     let locationTimezone = document.querySelector(".location-timezone");
     if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position=>{
               long = position.coords.longitude;
               lat = position.coords.latitude;

               const proxy = "https://cors-anywhere.herokuapp.com/";
               const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cf3aa3fa484d8f88b76c34b064eb484f&units=metric`;
          
               fetch(api)
               .then(response =>{
                    return response.json();
               })
               .then(data =>{
                    console.log(data);
                    const temp= data.main.temp;
                    const loc = data.name;

                    //set DOM elements from api
                    temperatureDegree.textContent = temp;
                    locationTimezone.textContent = loc;
               });
          });
     }
     else{
          h1.textContent = "We're unable to get your location :("
     }
});