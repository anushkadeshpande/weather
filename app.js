window.addEventListener('load',()=>{
     let long;
     let lat;
     let temperatureDescription = document.querySelector(".temperature-description");
     let temperatureDegree = document.querySelector(".temperature-degree");     
     let locationTimezone = document.querySelector(".location-timezone");
     let exact = document.querySelector(".exact-location");

     if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position=>{
               long = position.coords.longitude;
               lat = position.coords.latitude;

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
                    const loc = data.name;
                    const des = data.description;

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
          });

     }
     else{
          locationTimezone.textContent = "We're unable to get your location :("
     }

     function setIcons(icon,iconID){
          const skycons = new Skycons({color : "white"}); 
          const currentIcon = icon.replace(/-/g, "_").toUpperCase();
          skycons.play();
          return skycons.set(iconID, Skycons[currentIcon]);
     }
});