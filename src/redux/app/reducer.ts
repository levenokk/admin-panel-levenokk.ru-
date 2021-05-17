import {
  initialStateType,
  Note,
  NOTIFICATION,
  actionTypes,
  INITALIZE_APP,
  AUTH,
  TOOGGLE_ALERT,
  LOGOUT,
  LOADING,
  TOGGLE_THEME,
  Theme,
} from './types'

const initialState: initialStateType = {
  auth: false,
  initilize: false,
  loading: false,
  alert: {
    show: false,
    message: '',
    type: Note.warning,
  },
  theme: Theme.light,
}

const AppReducer = (state = initialState, action: actionTypes): initialStateType => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        alert: {
          show: true,
          message: action.message,
          type: action.noteType,
        },
      }
    case INITALIZE_APP:
      return {
        ...state,
        initilize: true,
      }
    case AUTH:
      return {
        ...state,
        auth: action.auth,
      }
    case TOOGGLE_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          show: action.show,
        },
      }

    case LOGOUT:
      return {
        ...state,
        auth: false,
      }
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case TOGGLE_THEME:
      return {
        ...state,
        theme: action.theme,
      }
    default:
      return state
  }
}

export default AppReducer
