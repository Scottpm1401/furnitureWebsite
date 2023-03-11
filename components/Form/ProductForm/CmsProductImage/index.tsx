import { IconButton, Input, Stack } from '@chakra-ui/react';
import Image from 'next/image';

import CloseIcon from '../../../../public/svg/close.svg';
import UploadIcon from '../../../../public/svg/upload.svg';
import { convertToBase64, isBase64Image } from '../../../../utils/common';

type CmsProductProps = {
  src: string;
  onDelete?: () => void;
  handleChangeImage?: (result: string | undefined) => void;
};

const CmsProductImage = ({
  src,
  onDelete,
  handleChangeImage,
}: CmsProductProps) => {
  return (
    <Stack
      position='relative'
      w='full'
      h='full'
      borderRadius='0.5rem'
      overflow='hidden'
      spacing={0}
      _hover={{
        '.popup': {
          visibility: 'visible',
          opacity: 1,
          zIndex: 1,
        },
      }}
    >
      <Image
        src={isBase64Image(src) ? src : `${process.env.NEXT_PUBLIC_CDN}${src}`}
        fill
        alt={src}
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
        <label htmlFor={`upload_${src}`}>
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
          >
            <UploadIcon stroke='white' />
          </Stack>
        </label>

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
            aria-label={`delete_${src}`}
            onClick={onDelete}
          />
        )}

        <Input
          id={`upload_${src}`}
          display='none'
          type='file'
          accept='image/png, image/gif, image/jpeg'
          onChange={async (e) => {
            const { result } = await convertToBase64(
              e.target.files?.[0] as File
            );

            handleChangeImage?.(result);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default CmsProductImage;
