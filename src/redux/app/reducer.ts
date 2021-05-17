import {
  actionTypes,
  AUTH,
  INITALIZE_APP,
  initialStateType,
  LOADING,
  LOGOUT,
  Note,
  NOTIFICATION,
  Theme,
  TOGGLE_THEME,
  TOOGGLE_ALERT,
} from './types';

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
};

const AppReducer = (
  state = initialState,
  action: actionTypes,
): initialStateType => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        alert: {
          show: true,
          message: action.message,
          type: action.noteType,
        },
      };
    case INITALIZE_APP:
      return {
        ...state,
        initilize: true,
      };
    case AUTH:
      return {
        ...state,
        auth: action.auth,
      };
    case TOOGGLE_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          show: action.show,
        },
      };

    case LOGOUT:
      return {
        ...state,
        auth: false,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case TOGGLE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default AppReducer;
