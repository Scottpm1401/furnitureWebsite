import useTranslation from 'next-translate/useTranslation';

import AdminAuthProvider from '../../layout/AdminAuthProvider';
import CmsContainer from '../../layout/CmsContainer';
import Page from '../../layout/Page';

type Props = {};

const Cms = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Dashboard' minH='100vh'>
        <CmsContainer title={t('dashboard')} />
      </Page>
    </AdminAuthProvider>
  );
};

export default Cms;
