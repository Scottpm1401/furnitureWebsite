import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { BannerFormType } from '../../../../models/api/cms';
import PlusIcon from '../../../../public/svg/plus.svg';
import BannerForm from '../BannerForm';

type Props = {
  onCreate: (values: BannerFormType) => void;
};

const CARD_HEIGHT = 230;
const CARD_WIDTH = 320;

const CmsCreateTemplateBanner = ({ onCreate }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const handleSubmit = (result: BannerFormType) => {
    onCreate(result);
    onClose();
  };

  return (
    <Stack
      minW={CARD_WIDTH}
      maxW={CARD_WIDTH}
      h={CARD_HEIGHT}
      borderRadius='0.5rem'
      overflow='hidden'
    >
      <Stack
        w='full'
        h='full'
        transition='all 300ms ease-in-out'
        background='blackAlpha.600'
        justifyContent='center'
        alignItems='center'
        gap='1rem'
        spacing={0}
      >
        <Stack
          w='40px'
          h='40px'
          p='8px'
          bg='whiteAlpha.400'
          _hover={{
            bg: 'whiteAlpha.600',
          }}
          transition='all 200ms ease-in-out'
          borderRadius='full'
          cursor='pointer'
          spacing={0}
          onClick={onOpen}
        >
          <PlusIcon stroke='white' />
        </Stack>
        <Modal onClose={onClose} size='xl' isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{t('banner_details')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <BannerForm onSubmit={handleSubmit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Stack>
  );
};

export default CmsCreateTemplateBanner;
