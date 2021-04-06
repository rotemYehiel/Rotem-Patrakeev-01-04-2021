const initialState = {
    theme: null,
    isModalOpen: false,
    msg: null,
    userLocation: null
}
export default function AppReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_THEME': {
            return {
                ...state,
                theme: (state.theme === 'light') ? 'dark' : 'light'
            }
        }
        case 'SET_THEME': {
            return {
                ...state,
                theme: action.theme
            }
        }
        case 'OPEN_MODAL': {
            return {
                ...state,
                msg: action.msg,
                isModalOpen: true
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                msg: null,
                isModalOpen: false
            }
        }
        case 'SET_USER_LOCATION': {
            return {
                ...state,
                userLocation: action.userLocation
            }
        }
        default:
            return state;
    }

};


