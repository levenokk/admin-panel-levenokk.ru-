import { NetworkStatus, useQuery } from '@apollo/client';
import { Box, Tab, Tabs } from '@material-ui/core';
import React, { useEffect } from 'react';

import Loader from '../components/Loader';
import MailItem from '../components/MailItem';
import Reload from '../components/Reload';
import { GET_MAILS } from '../grapql/query/query';
import { MailData } from '../grapql/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const EmptyText = () => {
  return (
    <Box textAlign='center' component='p'>
      Повідомлення відсутні
    </Box>
  );
};

const Mail: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const { data, loading, refetch, networkStatus } = useQuery<MailData, null>(
    GET_MAILS,
    {
      notifyOnNetworkStatusChange: true,
    },
  );

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
  };

  const notReadEmails =
    data?.mail
      ?.filter((mail) => !mail.read)
      .map((mail) => {
        return <MailItem {...mail} key={mail.id} />;
      }) || [];
  const readEmails =
    data?.mail
      ?.filter((mail) => mail.read)
      .map((mail) => {
        return <MailItem {...mail} key={mail.id} />;
      }) || [];

  useEffect(() => {
    document.title = 'Пошта';
  }, []);

  if (networkStatus === NetworkStatus.loading && loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='space-between'
        alignItems='center'
      >
        <h1>Пошта</h1>
        <Reload refetch={refetch} loading={networkStatus} />
      </Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='Нова пошта' />
        <Tab label='Прочитана пошта' />
      </Tabs>
      <TabPanel value={value} index={0}>
        {notReadEmails}
        {notReadEmails?.length === 0 && <EmptyText />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {readEmails}
        {readEmails?.length === 0 && <EmptyText />}
      </TabPanel>
    </Box>
  );
};

export default Mail;
