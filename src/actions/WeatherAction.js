import WeatherService from '../services/WeatherService'

export function setCity(city) {
    return async dispatch => {
        const newCity = await WeatherService.createNewCity(city);
        dispatch({ type: 'SET_CITY', newCity })
        return newCity
    }
}
export function getCurrWeather(id) {
    return async dispatch => {
        const weatherNow = await WeatherService.getCurrWeather(id);
        dispatch({ type: 'SET_WEATHER_NOW', weatherNow })
        return weatherNow
    }
}
export function getCityAutoComplete(cityValue) {
    return async dispatch => {
        const cityOptions = await WeatherService.getCityAutoComplete(cityValue);
        if (cityOptions.length === 1) {
            const currCity = cityOptions[0]
            dispatch({ type: 'SET_CURR_CITY', currCity })
        }
        return cityOptions
    }
}
export function toggleIsFavorites(city) {
    return async dispatch => {
        await WeatherService.toggleIsFavorites(city);
        dispatch({ type: 'TOGGLE_ISFAVORITE', city })
    }
}
export function getCityForecasts(id) {
    return async dispatch => {
        const cityForecasts = await WeatherService.getCityForecasts(id);
        dispatch({ type: 'SET_CITY_FORECASTS', cityForecasts })
    }
}
export function checkIsCityFavorite(id) {
    return async dispatch => {
        const isFavorite = await WeatherService.checkIsFavorite(id);
        dispatch({ type: 'SET_ISFAVORITE', isFavorite })
        return isFavorite
    }
}
export function getTempForDisplay(tempUnits, tempDetails) {
    return () => {
        return WeatherService.getTempForDisplay(tempUnits, tempDetails);
    }
}
export function convertTempForDisplay(tempUnits, tempValueToConvert) {
    return () => {
        return WeatherService.convertTempForDisplay(tempUnits, tempValueToConvert);
    }
}
export function convertDate(dateStr) {
    return () => {
        return WeatherService.convertDate(dateStr);
    }
}
export function loadFavorites() {
    return async dispatch => {
        const favorites = await WeatherService.loadFavorites();
        dispatch({ type: 'SET_FAVORITES', favorites })
    }
}
export function loadTempUnits() {
    return async dispatch => {
        const tempUnits = await WeatherService.loadTempUnits();
        dispatch({ type: 'SET_TEMP_UNITS', tempUnits })
    }
}
export function toggleTempUnits(currTempUnits) {
    WeatherService.toggleTempUnits(currTempUnits);
    return async dispatch => {
        dispatch({ type: 'TOGGLE_TEMP_UNITS' })
    }
}
