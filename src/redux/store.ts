import { createStore, combineReducers, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AppReducer from './app/reducer'

const reducers = combineReducers({
  app: AppReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ThunkMiddleware)))

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
