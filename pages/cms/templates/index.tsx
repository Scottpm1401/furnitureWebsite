import { Stack, Switch, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { APP_ROUTES } from '../../../constant';
import { useTemplates } from '../../../hooks/template';
import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';
import Page from '../../../layout/Page';
import { TemplateType } from '../../../models/template';
import { activeTemplate } from '../../../services/template';

type Props = {};

const CmsTemplates = (props: Props) => {
  const { t } = useTranslation();
  const { templates, getTemplates } = useTemplates();
  const router = useRouter();
  const toast = useToast();

  const handleActiveTemplate = async (template: TemplateType) => {
    if (template.active) return;

    try {
      await activeTemplate(template._id);
      await getTemplates();
    } catch (err) {
      toast({
        title: 'Failed to active template',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Template'>
        <CmsContainer title={t('template')}>
          <Stack spacing={4}>
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
                    onChange={() => handleActiveTemplate(template)}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsTemplates;
