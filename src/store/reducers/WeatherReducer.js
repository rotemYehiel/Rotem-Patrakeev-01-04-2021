const initialState = {
    favorites: [],
    currCity: null,
    tempUnits: null,
    isDayTime: true
}
export default function WeatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CITY': {
            return {
                ...state,
                currCity: action.newCity
            }
        }
        case 'SET_WEATHER_NOW':
            return {
                ...state,
                currCity: {
                    ...state.currCity,
                    weatherNow: action.weatherNow
                },
                isDayTime: action.weatherNow['IsDayTime']
            }
        case 'SET_CITY_FORECASTS': {
            return {
                ...state,
                currCity: {
                    ...state.currCity,
                    forecastsList: action.cityForecasts
                }
            }
        }
        case 'TOGGLE_ISFAVORITE':
            const idx = state.favorites.findIndex(favCity => favCity.id === action.city.id);
            if (idx === -1) {
                return {
                    ...state,
                    favorites: [...state.favorites, action.city],
                    currCity: {
                        ...state.currCity,
                        isFavorite: !state.currCity.isFavorite
                    }
                }
            } else {
                return {
                    ...state,
                    favorites: state.favorites.filter(favCity => favCity.id !== action.city.id),
                    currCity: {
                        ...state.currCity,
                        isFavorite: !state.currCity.isFavorite
                    }
                }
            }

        case 'SET_ISFAVORITE': {
            return {
                ...state,
                currCity: {
                    ...state.currCity,
                    isFavorite: action.isFavorite
                }
            }
        }
        case 'SET_FAVORITES': {
            return {
                ...state,
                favorites: action.favorites
            }
        }
        case 'TOGGLE_TEMP_UNITS': {
            return {
                ...state,
                tempUnits: (state.tempUnits === 'C') ? 'F' : 'C'
            }
        }
        case 'SET_TEMP_UNITS': {
            return {
                ...state,
                tempUnits: action.tempUnits
            }
        }
        default:
            return state;
    }


};


