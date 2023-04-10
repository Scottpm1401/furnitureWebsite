import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import { BannerFormType } from '../../../../models/api/cms';
import CloseIcon from '../../../../public/svg/close.svg';
import EditIcon from '../../../../public/svg/edit.svg';
import { isBase64Image } from '../../../../utils/common';
import BannerForm from '../BannerForm';

type CmsTemplateBannerProps = {
  onDelete?: () => void;
  banner: BannerFormType;
  handleUpdate: (result: BannerFormType) => void;
};

const CARD_HEIGHT = 230;
const CARD_WIDTH = 320;

const CmsTemplateBanner = ({
  onDelete,
  banner,
  handleUpdate,
}: CmsTemplateBannerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const handleSubmit = (result: BannerFormType) => {
    handleUpdate(result);
    onClose();
  };

  return (
    <Stack minW={CARD_WIDTH} maxW={CARD_WIDTH} h={CARD_HEIGHT}>
      <Stack
        w='full'
        h='full'
        position='relative'
        borderRadius='0.5rem'
        overflow='hidden'
        _hover={{
          '.popup': {
            visibility: 'visible',
            opacity: 1,
            zIndex: 1,
          },
        }}
        spacing={0}
      >
        <Image
          src={
            isBase64Image(banner.image)
              ? banner.image
              : `${process.env.NEXT_PUBLIC_CDN}${banner.image}`
          }
          fill
          alt={banner.image}
          sizes='(max-width: 768px) 100vw,
              (max-width: 1280px) 50vw,
              33vw'
        />
        <Stack
          className='popup'
          position='absolute'
          top='0px'
          left='0px'
          w='full'
          h='full'
          visibility='hidden'
          zIndex={0}
          opacity={0}
          transition='all 300ms ease-in-out'
          background='blackAlpha.600'
          justifyContent='center'
          alignItems='center'
          gap='1rem'
          spacing={0}
        >
          <Stack
            w='36px'
            h='36px'
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
            <EditIcon stroke='white' />
          </Stack>
          {onDelete && (
            <IconButton
              position='absolute'
              w='24px'
              h='24px'
              p='4px'
              minW='unset'
              top='8px'
              right='8px'
              colorScheme='whiteAlpha'
              borderRadius='full'
              icon={<CloseIcon stroke='white' />}
              aria-label={`delete_${banner.image}`}
              onClick={onDelete}
            />
          )}
        </Stack>
      </Stack>

      <Modal onClose={onClose} size='xl' isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('banner_details')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <BannerForm banner={banner} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default CmsTemplateBanner;
