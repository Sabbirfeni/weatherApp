// // const { default: axios } = require("axios");

const API_KEY = 'aedeabe732bc2af6e3f0455831f56be7';
let URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = 'http://openweathermap.org/img/wn/';
const CITY = 'Feni';

const weatherIcon = document.getElementById('weather-icon');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const weatherStatus = document.getElementById('weather-status');
// // const mainText = document.getElementById('mainText');
// // const description = document.getElementById('description');
// // const country = document.getElementById('country');
// // const history = document.querySelector('.history');

const searchBtn = document.getElementById('search-btn');
const setWeather = weather => {

    // weatherImage.src = `${ICON_URL}${weather.icon}.png`;
    if(weather.main === 'Clouds') {
        weatherIcon.src = '../src/images/clouds.png'
    } else if(weather.main === 'Haze') {
        weatherIcon.src = '../src/images/haze.png'
    } else if(weather.main === 'Mist') {
        weatherIcon.src = '../src/images/mist.png'
    } else if(weather.main === 'Drizzle') {
        weatherIcon.src = '../src/images/drizzle.png'
    } else if(weather.main === 'Thunderstorm') {
        weatherIcon.src = '../src/images/storm.png'
    } else if(weather.main === 'Rain') {
        weatherIcon.src = '../src/images/rain.png'
    } else if(weather.main === 'Snow') {
        weatherIcon.src = '../src/images/snow.png'
    } else if(weather.main === 'Clear') {
        weatherIcon.src = '../src/images/clear.png'
    } else if(weather.main === 'Fog') {
        weatherIcon.src = '../src/images/fog.png'
    } else {
        weatherIcon.src = '../src/images/wind.png'
    }
    
    city.innerHTML = weather.name;
    temp.innerHTML = weather.temp + '°c';
    humidity.innerHTML = weather.humidity + '%';
    pressure.innerHTML = weather.pressure;
    weatherStatus.innerHTML = weather.main;
    console.log(weather)
    // mainText.innerHTML = weather.main;
    // description.innerHTML = weather.description;
    // country.innerHTML = weather.country;
}

const getWeatherData = (city = CITY, coords) => {
    weatherStatus.innerHTML = 'Loading...'
    let url = URL
    city === null ? 
    url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
    url = `${url}&q=${city}`

    fetch(url)
        .then(request => {
            return request.json()
        })
        .then(data => {
            let weather = {
                icon: data.weather[0].icon,
                name: data.name,
                country: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            }
            setWeather(weather);
        })
        .catch(e => {
            // alert(`City did not found!`)
            weatherStatus.innerHTML = 'City did not found!'
        }) 
}

window.onload = function () {
    navigator.geolocation.getCurrentPosition(allow => {
        getWeatherData(null, allow.coords)
    }, block => {
        getWeatherData()
    })
    
    // axios.get('https://reqres.in/api/users/2').then(res => {
    //     console.log(res.data.data)
    // })

    // axios.get('/api/history')
    //     .then(({ data }) => {
    //         if (data.length > 0) {
    //             updateHistory(data)
    //         } else {
    //             historyElm.innerHTML = 'There is No History'
    //         }
    //     })
    //     .catch(e => {
    //         console.log(e)
    //         alert('Error Occurred')
    //     })


    searchBtn.addEventListener('click', () => {
        const inputEle = document.getElementById('inputEle');
        if(inputEle.value) {
            getWeatherData(inputEle.value);
            inputEle.value = '';
        }
    })
}


