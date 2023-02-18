import React from 'react';

import AdminAuthProvider from '../../layout/AdminAuthProvider';
import CmsSideBar from '../../layout/CmsSideBar';
import Page from '../../layout/Page';

type Props = {};

const Cms = (props: Props) => {
  return (
    <AdminAuthProvider>
      <Page direction='row' title='CMS' minH='100vh'>
        {/* <CmsSideBar /> */}
      </Page>
    </AdminAuthProvider>
  );
};

export default Cms;
