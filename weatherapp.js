import { WEATHER_API_KEY } from './apikey.js';


//Fetch ALL the things



async function getData(input) {
    document.getElementById('citysearch').innerText = '';
        const datafetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${input}&units=imperial&appid=${WEATHER_API_KEY}`);
        const data = await datafetch.json(); {
            //JSON.stringify(data); don't need this
            if(data.cod!="200"){
                document.getElementById('statusmessage').innerHTML = "City not found, please try again.";}
            else {
                document.getElementById('statusmessage').innerHTML = "";
            location(data);
            currentWeather(data)
            return data;}
        }
}
// fill location information
function location(data) {
    document.getElementById("currentcity").innerText = `${data.name} , ${data.sys.country}`;
    let date = new Date((data.dt + data.timezone)* 1000);
    let datedetails = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    datedetails.timeZone = 'UTC';
    document.getElementById("current-date").innerText = date.toLocaleString('en-US', datedetails);
    
}
//fill current weather box
function currentWeather(data) {
    document.getElementById("currentweathervalue").innerHTML = `${Math.round(data.main.temp)}&deg;`;
    document.getElementById("hightempvalue").innerHTML = `${Math.round(data.main.temp_max)}&deg;`;
    document.getElementById("lowtempvalue").innerHTML= `${Math.round(data.main.temp_min)}&deg`;
    document.getElementById("humidityvalue").innerHTML= `${data.main.humidity}%`;
    document.getElementById("windvalue").innerHTML= `${Math.round(data.wind.speed)} MPH`;
    document.getElementById("currentstatus").innerHTML= `${data.weather[0].main}`
    document.getElementById("weathericon").src= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}

//set default zip and save zip on button click
window.onload = function() {
    document.getElementById("save-button").addEventListener("click", function() {
    let defaultcity = document.getElementById("citysearch").value;
    if(defaultcity !="" ){
      localStorage.setItem('savedZip',defaultcity);
      document.getElementById('statusmessage').innerText = `${defaultcity} saved as default zip.`;
    }
  });

  const savedZip = localStorage.getItem('savedZip');
	getData(savedZip === null?'67730':savedZip);

// submit form on click or enter of search    
    document.getElementById("search-button").addEventListener("click", function(e) {
        getData(document.getElementById('citysearch').value);       
    });

    document.getElementById("citysearch").addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        getData(document.getElementById('citysearch').value);
      }
    })
}

