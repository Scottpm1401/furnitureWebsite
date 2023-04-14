import { Button, Stack, Switch, Text, useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { APP_ROUTES } from '../../../constant';
import { useTemplates } from '../../../hooks/template';
import CmsContainer from '../../../layout/Container/CmsContainer';
import Page from '../../../layout/Page';
import AdminAuthProvider from '../../../layout/Provider/AdminAuthProvider';
import { TemplateType } from '../../../models/template';
import PlusIcon from '../../../public/svg/plus.svg';
import TrashIcon from '../../../public/svg/trash.svg';
import { activeTemplate, deleteTemplate } from '../../../services/template';
import { NextApplicationPage } from '../../_app';

const CmsTemplates: NextApplicationPage = () => {
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
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  const handleDeleteTemplate = async (template: TemplateType) => {
    try {
      await deleteTemplate(template._id);
      await getTemplates();
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <Page direction='row' w='full' title='Template'>
      <CmsContainer
        title={t('template')}
        rightElement={
          <Button
            leftIcon={<PlusIcon width={16} height={16} strokeWidth={4} />}
            colorScheme='orange'
            onClick={() => router.push(APP_ROUTES.cms.templates.create)}
          >
            {t('create')}
          </Button>
        }
      >
        <Stack spacing={4}>
          {templates.map((template) => (
            <Stack key={template._id}>
              <Stack
                position='relative'
                direction='row'
                alignItems='center'
                spacing={4}
              >
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
                <Stack
                  position='absolute'
                  top='0'
                  right='0'
                  bg='orange.400'
                  p='4px'
                  cursor='pointer'
                  w='24px'
                  h='24px'
                  borderRadius='4px'
                  _hover={{ opacity: 0.8 }}
                  transition='all 300ms ease-in-out'
                  onClick={() => handleDeleteTemplate(template)}
                >
                  <TrashIcon style={{ stroke: 'white' }} />
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CmsContainer>
    </Page>
  );
};

CmsTemplates.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsTemplates;
