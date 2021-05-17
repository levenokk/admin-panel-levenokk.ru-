import { authAction, notificationAction } from '../redux/app/actions';
import { Note } from '../redux/app/types';
import { AppDispatch } from '../redux/store';

export const logout = (err: Error, dispatch: AppDispatch): void => {
  if (err.message === 'Not permission') {
    dispatch(authAction(false));
    dispatch(
      notificationAction('Сесія закінчилась, авторизуйтесь !', Note.info),
    );
  } else {
    dispatch(notificationAction(err.message, Note.warning));
  }
};
