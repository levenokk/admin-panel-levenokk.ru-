import {
  authActionType,
  AUTH,
  NOTIFICATION,
  noteActionType,
  Note,
  initalizeActionType,
  INITALIZE_APP,
  toggleAlertActionType,
  TOOGGLE_ALERT,
  logoutActionType,
  LOGOUT,
  loadingActionType,
  LOADING,
  toggleThemeActionType,
  TOGGLE_THEME,
  Theme,
} from './types'
import { AppDispatch } from '../store'

export const authAction = (auth: boolean): authActionType => ({
  auth,
  type: AUTH,
})

export const notificationAction = (message: string, noteType: Note): noteActionType => ({
  type: NOTIFICATION,
  message,
  noteType,
})

export const initalizeAction = (): initalizeActionType => {
  return {
    type: INITALIZE_APP,
  }
}

export const toggleAlert = (show: boolean): toggleAlertActionType => {
  return {
    type: TOOGGLE_ALERT,
    show,
  }
}

export const logout = (): logoutActionType => {
  return {
    type: LOGOUT,
  }
}

export const logoutThunk = () => (dispatch: AppDispatch): void => {
  localStorage.removeItem('token')
  dispatch(logout())
  dispatch(notificationAction('Ви успішно вийшли з системи', Note.success))
}

export const switchLoading = (loading: boolean): loadingActionType => {
  return {
    type: LOADING,
    loading,
  }
}

export const toggleTheme = (theme: Theme): toggleThemeActionType => {
  return {
    type: TOGGLE_THEME,
    theme,
  }
}

