import { useQuery } from '@apollo/client';
import { Box } from '@material-ui/core';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import RemoveMail from '../components/RemoveMail';
import UpdateMail from '../components/UpdateMail';
import { GET_MAILS } from '../grapql/query/query';
import { Mail, MailData } from '../grapql/types';

const SingleMail: React.FC = () => {
  const params: { id: string } = useParams();
  const { data, loading } = useQuery<MailData, { id: string }>(GET_MAILS, {
    variables: {
      id: params.id,
    },
  });

  if (loading) {
    return <Loader />;
  }

  const mail: Mail | null = data?.mail[0] || null;

  if (!mail) {
    return (
      <Box textAlign='center'>
        Дане повідомлення не існує.{' '}
        <NavLink to='/mail'>Подивитись інші повідомлення</NavLink>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='space-between'
        alignItems='center'
      >
        <h1>{mail.name}</h1>
        <RemoveMail id={mail.id} />
      </Box>
      <Box>
        <Box component='b'>Ім&apos;я: </Box>
        {mail.name}
      </Box>
      <Box>
        <Box component='b'>Пошта:</Box>
        <a href={'mailto:' + mail.email}> {mail.email}</a>
      </Box>
      <Box component='p' marginTop='20px'>
        {mail.message}
      </Box>
      {!mail.read && <UpdateMail id={params.id} />}
    </Box>
  );
};

export default SingleMail;
