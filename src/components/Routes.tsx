import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../redux/store'
import { authAction, initalizeAction } from '../redux/app/actions'

// general pages
import Loader from './Loader'
import MainLayout from '../layouts/Main'
import EmptyLayout from '../layouts/empty'
import Note from './Note'

// auth pages
import Works from '../pages/Works'
import Settings from '../pages/Settings'
import Galery from '../pages/Galery'
import Mail from '../pages/Mail'
import SingleMail from '../pages/SingleMail'

// not auth pages
import Auth from '../pages/Auth'
import { useMutation } from '@apollo/client'
import { CHECK_AUTH } from '../grapql/mutation/mutation'

const AuthRouter: React.FC = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path="/works" exact={true} component={Works} />
        <Route path="/settings" exact={true} component={Settings} />
        <Route path="/galery" exact={true} component={Galery} />
        <Route path="/mail" exact={true} component={Mail} />
        <Route path="/mail/:id" exact={true} component={SingleMail} />
        <Redirect to="/works" />
      </Switch>
    </MainLayout>
  )
}

const NotAuthRouter: React.FC = () => {
  return (
    <EmptyLayout>
      <Switch>
        <Route path="/login" exact={true} component={Auth} />
        <Redirect to="/login" />
      </Switch>
    </EmptyLayout>
  )
}

const Routes: React.FC = () => {
  const auth = useSelector((state: RootReducer) => state.app.auth)
  const initalize = useSelector((state: RootReducer) => state.app.initilize)
  const [sign] = useMutation<{checkAuth: boolean}, null>(CHECK_AUTH)

  const dispatch = useDispatch()

  useEffect(() => {
    sign().then(({ data })=>{
      dispatch(authAction(data!.checkAuth))
    }).catch(()=>{
      dispatch(authAction(false))
    }).finally(()=>{
      dispatch(initalizeAction())
    })
  }, [dispatch])

  if (!initalize) {
    document.title = 'Завантаження'
    return <Loader />
  }

  return (
    <>
      <Note />
      {auth ? <AuthRouter /> : <NotAuthRouter />}
    </>
  )
}

export default Routes
