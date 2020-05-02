window.addEventListener('load',()=>{
     let long;
     let lat;
     
     if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position=>{
               long = position.coords.longitude;
               lat = position.coords.latitude;

               //console.log(lat,long);
               const proxy = 'https://cors-anywhere.herokuapp.com/';
               const api = '${proxy}api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=cf3aa3fa484d8f88b76c34b064eb484f';
          
               fetch(api)
               .then(response =>{
                    return response.json();
               })
               .then(data =>{
                    console.log(data);
               });
          });
     }
     else{
          h1.textContent = "We're unable to get your location :("
     }
});