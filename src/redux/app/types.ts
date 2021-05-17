export const AUTH = 'AUTH'
export const NOTIFICATION = 'AUTNOTIFICATIONH'
export const INITALIZE_APP = 'INITALIZE_APP'
export const TOOGGLE_ALERT = 'TOGGLE_ALERT'
export const LOGOUT = 'LOGOUT'
export const LOADING = 'LOADING'
export const TOGGLE_THEME = 'TOGGLE_THEME'

export enum Note {
  warning = 'warning',
  info = 'info',
  success = 'success',
  error = 'error',
}

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export type toggleThemeActionType = {
  type: typeof TOGGLE_THEME
  theme: Theme
}

export type noteActionType = {
  type: typeof NOTIFICATION
  message: string
  noteType: Note
}

export type dataUserType = {
  login: string
  password: string
}

export type initialStateType = {
  auth: boolean
  initilize: boolean
  loading: boolean
  alert: {
    show: boolean
    message: string
    type: Note
  }
  theme: Theme
}

export type authActionType = {
  type: typeof AUTH
  auth: boolean
}

export type initalizeActionType = {
  type: typeof INITALIZE_APP
}

export type toggleAlertActionType = {
  type: typeof TOOGGLE_ALERT
  show: boolean
}

export type logoutActionType = {
  type: typeof LOGOUT
}

export type loadingActionType = {
  type: typeof LOADING
  loading: boolean
}

export type actionTypes =
  | authActionType
  | noteActionType
  | initalizeActionType
  | toggleAlertActionType
  | logoutActionType
  | loadingActionType
  | toggleThemeActionType
