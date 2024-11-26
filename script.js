const apiKey = "d401195d907ae041cc8db9ec3efc7db0";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".sun-block");

async function weatherData(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (!response.ok) {
        // alert("City not found. Please try again.");
        return;
    }
    
    const data = await response.json();
    const description = data.weather[0].main;

    // console.log(data); // to display in console

    document.getElementById('city').innerText = data.name;
    document.getElementById('temperature').innerText = Math.round(data.main.temp) + "°c";
    document.getElementById('weather-description').innerText = description;
    document.querySelector('.humidity').innerText = data.main.humidity + "%";
    document.querySelector('.wind-speed').innerText = data.wind.speed + " Km/h";

    document.querySelectorAll(".sun-block img").forEach(icon => {
        icon.style.display = "none";
    });

    if(description.includes("Snow")){
        document.querySelector(".snow").style.display = "block";
    }
    else if(description.includes("Haze")){
        document.querySelector(".haze").style.display = "block";
    }
    else if(description.includes("Clouds")){
        document.querySelector(".partly-cloudy").style.display = "block";
    }
    else if(description.includes("Drizzle")){
        document.querySelector(".light-rain").style.display = "block";
    }
    else if(description.includes("Rain")){
        document.querySelector(".rainy").style.display = "block";
    }
    else if(description.includes("Thunderstorm")){
        document.querySelector(".thunder").style.display = "block";
    }
    else if(description.includes("Extreme rain")){
        document.querySelector(".heavy-rain").style.display = "block";
    }
    else{
        document.querySelector(".sun").style.display = "block";
    }
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false});
    const dayString = now.toLocaleDateString([], { weekday: 'long' });

    document.getElementById('time').innerText = timeString;
    document.getElementById('day').innerText = dayString;
}

searchbtn.addEventListener("click", ()=>{
    const city = searchbox.value.trim();
    document.getElementById('city').innerText = city; // Display city name immediately
    weatherData(city); // Fetch weather data for the entered city
})

updateTime();