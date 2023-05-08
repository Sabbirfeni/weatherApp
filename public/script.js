// const { default: axios } = require("axios");

const API_KEY = 'aedeabe732bc2af6e3f0455831f56be7';
let URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = 'http://openweathermap.org/img/wn/';
const CITY = 'Dhaka';

const weatherImage = document.getElementById('weatherImage');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const mainText = document.getElementById('mainText');
const description = document.getElementById('description');
const country = document.getElementById('country');
const history = document.querySelector('.history');

const setWeather = weather => {
    weatherImage.src = `${ICON_URL}${weather.icon}.png`;
    city.innerHTML = weather.name;
    temp.innerHTML = weather.temp;
    mainText.innerHTML = weather.main;
    description.innerHTML = weather.description;
    country.innerHTML = weather.country;
}

const getWeatherData = (city = CITY, coords) => {
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
        .catch(e => alert('City not found!')) 
}

window.onload = function () {
    navigator.geolocation.getCurrentPosition(allow => {
        getWeatherData(null, allow.coords)
    }, block => {
        getWeatherData()
    })
    
    axios.get('https://reqres.in/api/users/2').then(res => {
        console.log(res.data.data)
    })

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

    document.getElementById('inputEle').addEventListener('keypress', e => {
        if(e.key == 'Enter') {
            if(e.target.value) {
                getWeatherData(e.target.value);
                e.target.value = '';
            }

        }
    })
}


