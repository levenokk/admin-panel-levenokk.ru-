import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

import { UPDATE_MAIL } from '../grapql/mutation/mutation';
import { UpdateMailData } from '../grapql/types';
import { notificationAction } from '../redux/app/actions';
import { Note } from '../redux/app/types';

const UpdateMail: React.FC<{ id: string }> = ({ id }) => {
  const [update, { loading }] =
    useMutation<UpdateMailData, { id: string; read: boolean }>(UPDATE_MAIL);

  const dispatch = useDispatch();

  const updateMailHandler = () => {
    update({
      variables: {
        id,
        read: true,
      },
    }).then(() => {
      dispatch(
        notificationAction('Повідомлення успішно прочитано', Note.success),
      );
    });
  };

  return (
    <>
      <Button
        onClick={updateMailHandler}
        disabled={loading}
        variant='contained'
        color='primary'
      >
        Зробити як прочитане
      </Button>
    </>
  );
};

UpdateMail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateMail;
