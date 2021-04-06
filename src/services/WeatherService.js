import axios from 'axios';

// const apiKey = 'WFKelUZfbiA6S7GFiaq8OgExPynx7mIx';
// const apiKey = 'w36eRSsLooZz4Fv2C1H5Dq9AwtTr8wsU';
const apiKey = 'CN37hasX3NF7aSmaxuMBeFY0G2dB2VAT';


const defaultLan = 'en-us';
const baseUrl = `https://dataservice.accuweather.com/`
const urlAoutocompleteLocationSearch = `locations/v1/cities/autocomplete`
const urlForcastsByCity = `forecasts/v1/daily/5day`
const urlCurrWeather = `currentconditions/v1`
const urlLocationByLatLon = `locations/v1/cities/geoposition/search`

const getCityAutoComplete = async (cityValue) => {
    const OptionsOfCities = _getFromStorage('Options Of Cities');
    if (OptionsOfCities) {
        return OptionsOfCities;
    } else {
        return axios.get(`${baseUrl}${urlAoutocompleteLocationSearch}`, {
            params: {
                apikey: apiKey,
                q: cityValue,
                language: defaultLan
            }
        })
            .then(res => {
                console.log("res:", res)
                _saveToStorage('Options Of Cities', res.data)
                return res.data
            }).catch((error) => {
                console.log("error:", error)
                throw new Error('You dont have accses to the API')
            })
    }
}
const getCityForecasts = async (id) => {
    const cityForecasts = _getFromStorage('Daily Forecasts');
    if (cityForecasts) {
        return cityForecasts;
    } else {
        return axios.get(`${baseUrl}${urlForcastsByCity}/${id}`, {
            params: {
                apikey: apiKey,
                language: defaultLan,
                details: false,
                metric: false
            }
        }).then(res => {
            console.log("res:", res)

            const cityForecastsArr = res.data['DailyForecasts']
            _saveToStorage('Daily Forecasts', cityForecastsArr)
            return cityForecastsArr
        }).catch((error) => {
            console.log("error:", error)
            throw new Error('You dont have accses to the API')
        })
    }
}
const getCurrWeather = async (id) => {
    const weatherNow = _getFromStorage('Now Weather');
    if (weatherNow) {
        return weatherNow;
    } else {
        return axios.get(`${baseUrl}${urlCurrWeather}/${id}`, {
            params: {
                apikey: apiKey,
                language: defaultLan,
                details: false,
            }
        }).then(res => {
            console.log("res:", res)

            const weatherForNow = res.data[0]
            _saveToStorage('Now Weather', weatherForNow)
            return weatherForNow
        }).catch((error) => {
            console.log("error:", error)
            throw new Error('You dont have accses to the API')
        })
    }
}
const checkIsFavorite = (id) => {
    if (!_getFromStorage('Favorites')) {
        _saveToStorage('Favorites', []);
    }
    const favorites = _getFromStorage('Favorites');
    return ((favorites.find(city => city.id === id) === undefined) ? false : true)

}
const createNewCity = async (city) => {
    if (city.id) {
        return {
            name: city.name,
            id: city.id,
            isFavorite: null,
            weatherNow: null,
            forecastsList: []
        }
    } else {
        if (_getFromStorage('Default City')) {
            return _getFromStorage('Default City');
        } else {
            if (_getFromStorage('User Location')) {
                const location = _getFromStorage('User Location');
                return axios.get(`${baseUrl}${urlLocationByLatLon}`, {
                    params: {
                        apikey: apiKey,
                        q: `${location.lat},${location.lon}`,
                        language: defaultLan,
                        details: false,
                        toplevel: false
                    }
                }).then(res => {
                    console.log("res:", res)

                    _saveToStorage('Finding Location API', res.data)
                    _saveToStorage('Default City', {
                        name: res.data['ParentCity']['LocalizedName'],
                        id: res.data['ParentCity']['Key'],
                        isFavorite: null,
                        weatherNow: null,
                        forecastsList: []
                    })
                    return _getFromStorage('Default City');
                }).catch((error) => {
                    console.log("error:", error)
                    throw new Error('You dont have accses to the API')
                })
            } else {
                _saveToStorage('Default City', {
                    name: 'Tel Aviv',
                    id: '215854',
                    isFavorite: null,
                    weatherNow: null,
                    forecastsList: []
                })
                return _getFromStorage('Default City');
            }
        }
    }
}
const getTempForDisplay = (tempUnits, tempDetails) => {
    switch (tempUnits) {
        case 'C':
            return tempDetails['Metric']['Value'];
        default:
            return tempDetails['Imperial']['Value'];
    }
}
const convertTempForDisplay = (tempUnits, tempValueToConvert) => {
    switch (tempUnits) {
        case 'C':
            return Number(((tempValueToConvert - 32) * 5 / 9).toFixed(1));
        default:
            return Number((tempValueToConvert * 9 / 5 + 32).toFixed(1));
    }
}
const convertDate = (dateStr) => {
    return new Date(dateStr);
}
const toggleIsFavorites = (city) => {
    const favorites = _getFromStorage('Favorites');
    const idx = favorites.findIndex(favCity => favCity.id === city.id);
    if (idx === -1) {
        favorites.push(city);
        _saveToStorage('Favorites', favorites);
    } else {
        favorites.splice(idx, 1);
        _saveToStorage('Favorites', favorites);
    }
}
const loadFavorites = () => {
    if (!_getFromStorage('Favorites')) {
        _saveToStorage('Favorites', []);
    }
    return _getFromStorage('Favorites');
}
const loadTempUnits = () => {
    if (!_getFromStorage('Temp Units')) {
        _saveToStorage('Temp Units', 'C');
    }
    return _getFromStorage('Temp Units');
}
const toggleTempUnits = (currTempUnits) => {
    if (!_getFromStorage('Temp Units')) {
        _saveToStorage('Temp Units', currTempUnits);
    }
    switch (currTempUnits) {
        case 'C': {
            _saveToStorage('Temp Units', 'F');
            break;
        }
        default: {
            _saveToStorage('Temp Units', 'C');
        }
    }
    return _getFromStorage('Temp Units');
}
const WeatherService = {
    getCurrWeather,
    getCityAutoComplete,
    getCityForecasts,
    checkIsFavorite,
    createNewCity,
    getTempForDisplay,
    convertTempForDisplay,
    convertDate,
    toggleIsFavorites,
    loadFavorites,
    loadTempUnits,
    toggleTempUnits
}
const _getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(`${key}`))
}
const _saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}
export default WeatherService;