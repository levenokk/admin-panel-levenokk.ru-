import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CHECK_AUTH } from '../grapql/mutation/mutation';
import EmptyLayout from '../layouts/empty';
import MainLayout from '../layouts/Main';
import Auth from '../pages/Auth';
import Galery from '../pages/Galery';
import Mail from '../pages/Mail';
import Settings from '../pages/Settings';
import SingleMail from '../pages/SingleMail';
import Works from '../pages/Works';
import { authAction, initalizeAction } from '../redux/app/actions';
import { RootReducer } from '../redux/store';
import Loader from './Loader';
import Note from './Note';

const AuthRouter: React.FC = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path='/works' exact={true} component={Works} />
        <Route path='/settings' exact={true} component={Settings} />
        <Route path='/galery' exact={true} component={Galery} />
        <Route path='/mail' exact={true} component={Mail} />
        <Route path='/mail/:id' exact={true} component={SingleMail} />
        <Redirect to='/works' />
      </Switch>
    </MainLayout>
  );
};

const NotAuthRouter: React.FC = () => {
  return (
    <EmptyLayout>
      <Switch>
        <Route path='/login' exact={true} component={Auth} />
        <Redirect to='/login' />
      </Switch>
    </EmptyLayout>
  );
};

const Routes: React.FC = () => {
  const auth = useSelector((state: RootReducer) => state.app.auth);
  const initalize = useSelector((state: RootReducer) => state.app.initilize);
  const [sign] = useMutation<{ checkAuth: boolean }, null>(CHECK_AUTH);

  const dispatch = useDispatch();

  useEffect(() => {
    sign()
      .then(({ data }) => {
        dispatch(authAction(data!.checkAuth));
      })
      .catch(() => {
        dispatch(authAction(false));
      })
      .finally(() => {
        dispatch(initalizeAction());
      });
  }, [dispatch, sign]);

  if (!initalize) {
    document.title = 'Завантаження';
    return <Loader />;
  }

  return (
    <>
      <Note />
      {auth ? <AuthRouter /> : <NotAuthRouter />}
    </>
  );
};

export default Routes;
