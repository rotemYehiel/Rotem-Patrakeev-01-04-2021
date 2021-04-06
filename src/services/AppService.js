
const toggleTheme = () => {
    const theme = _getFromStorage('Theme');
    switch (theme) {
        case 'light': {
            _saveToStorage('Theme', 'dark');
            break;
        }
        default: {
            _saveToStorage('Theme', 'light');
        }
    }

}
const loadTheme = () => {
    if (!_getFromStorage('Theme')) {
        _saveToStorage('Theme', 'light');
    }
    return _getFromStorage('Theme');
}
const setUserLocation = (userLocation) => {
    if (!_getFromStorage('User Location')) {
        _saveToStorage('User Location', userLocation);
    }
    return _getFromStorage('User Location');
}
const AppService = {
    loadTheme,
    toggleTheme,
    setUserLocation
}
const _getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(`${key}`))
}
const _saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}
export default AppService;