import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { APP_ROUTES } from '../../../constant';
import { useTemplates } from '../../../hooks/template';
import CmsContainer from '../../../layout/Container/CmsContainer';
import Page from '../../../layout/Page';
import AdminAuthProvider from '../../../layout/Provider/AdminAuthProvider';
import { TemplateType } from '../../../models/template';
import PlusIcon from '../../../public/svg/plus.svg';
import TrashIcon from '../../../public/svg/trash.svg';
import { useAppDispatch } from '../../../redux/hooks';
import { actions } from '../../../redux/reducer';
import { activeTemplate, deleteTemplate } from '../../../services/template';
import { NextApplicationPage } from '../../_app';

type Alert = {
  isOpen: boolean;
  content?: string;
  onSuccess?: () => void;
  onClose?: () => void;
};

const initialAlert: Alert = {
  isOpen: false,
};

const CmsTemplates: NextApplicationPage = () => {
  const { t } = useTranslation();
  const { templates, getTemplates, isLoading } = useTemplates();
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState(initialAlert);

  const handleActiveTemplate = async (template: TemplateType) => {
    if (template.active) return;

    try {
      const res = await activeTemplate(template._id);
      dispatch(actions.global.setTemplate(res));
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

  const handleCloseAlert = () => {
    alert.onClose?.();
    setAlert(initialAlert);
  };

  const handleSuccessAlert = () => {
    alert.onSuccess?.();
    setAlert(initialAlert);
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
          {!isLoading ? (
            templates.map((template) => (
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                key={template._id}
              >
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
                <Stack
                  bg='orange.400'
                  p='4px'
                  cursor='pointer'
                  w='24px'
                  h='24px'
                  borderRadius='4px'
                  _hover={{ opacity: 0.8 }}
                  transition='all 300ms ease-in-out'
                  onClick={() =>
                    setAlert({
                      isOpen: true,
                      content: template.title,
                      onSuccess: () => handleDeleteTemplate(template),
                    })
                  }
                >
                  <TrashIcon style={{ stroke: 'white' }} />
                </Stack>
              </Stack>
            ))
          ) : (
            <>
              {new Array(6).fill(0).map((item, index) => (
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  key={`${item}_${index}`}
                >
                  <Stack direction='row' alignItems='center' spacing={4}>
                    <Skeleton h='36px' w='300px' />
                    <Skeleton h='28px' w='50px' />
                  </Stack>
                  <Stack>
                    <Skeleton w='24px' h='24px' />
                  </Stack>
                </Stack>
              ))}
            </>
          )}

          <Modal
            onClose={handleCloseAlert}
            size='xl'
            isOpen={alert.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{t('delete_template')}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {t('are_you_sure_to_delete', { title: alert.content })}
              </ModalBody>
              <ModalFooter justifyContent='center'>
                <Button
                  variant='ghost'
                  colorScheme='orange'
                  mr={3}
                  onClick={handleCloseAlert}
                >
                  {t('cancel')}
                </Button>
                <Button colorScheme='orange' onClick={handleSuccessAlert}>
                  {t('delete')}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </CmsContainer>
    </Page>
  );
};

CmsTemplates.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsTemplates;
