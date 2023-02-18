import { Stack } from '@chakra-ui/react';
import React from 'react';

import AdminAuthProvider from '../../layout/AdminAuthProvider';
import Page from '../../layout/Page';

type Props = {};

const Cms = (props: Props) => {
  return (
    <AdminAuthProvider>
      <Page direction='row' title='Dashboard' minH='100vh'>
        Dashboard
      </Page>
    </AdminAuthProvider>
  );
};

export default Cms;
