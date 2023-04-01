import { Stack, Switch, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { APP_ROUTES } from '../../../constant';
import { useTemplates } from '../../../hooks/template';
import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';
import Page from '../../../layout/Page';
import { activeTemplate } from '../../../services/template';

type Props = {};

const CmsTemplates = (props: Props) => {
  const { t } = useTranslation();
  const { templates } = useTemplates();
  const router = useRouter();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Template'>
        <CmsContainer title={t('template')}>
          {templates.map((template) => (
            <Stack key={template._id}>
              <Stack direction='row' alignItems='center' spacing={4}>
                <Text
                  fontSize='2xl'
                  fontWeight='semibold'
                  cursor='pointer'
                  color={template.active ? 'orange.400' : 'initial'}
                  _hover={{ color: 'orange.400' }}
                  onClick={() =>
                    router.push(APP_ROUTES.cms.templates.index(template._id))
                  }
                >
                  {template.title}
                </Text>
                <Switch
                  isChecked={template.active}
                  colorScheme='orange'
                  size='lg'
                  onChange={() =>
                    !template.active && activeTemplate(template._id)
                  }
                />
              </Stack>
            </Stack>
          ))}
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsTemplates;
