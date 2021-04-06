import AppService from '../services/AppService';

export function toggleTheme() {
    AppService.toggleTheme();
    return async dispatch => {
        dispatch({ type: 'TOGGLE_THEME' })
    }
}
export function loadTheme() {
    const theme = AppService.loadTheme();
    return async dispatch => {
        dispatch({ type: 'SET_THEME', theme })
    }
}
export function openModal(msg) {
    return async dispatch => {
        dispatch({ type: 'OPEN_MODAL', msg })
    }
}
export function closeModal() {
    return async dispatch => {
        dispatch({ type: 'CLOSE_MODAL' })
    }
}
export function getUserLocation(userCurrLocation) {
    const userLocation = AppService.setUserLocation(userCurrLocation);
    return async dispatch => {
        dispatch({ type: 'SET_USER_LOCATION', userLocation })
    }
}