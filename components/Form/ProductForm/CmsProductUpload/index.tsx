import { Input, Stack } from '@chakra-ui/react';
import React from 'react';

import UploadIcon from '../../../../public/svg/upload.svg';
import { convertToBase64 } from '../../../../utils/common';

type CmsProductUploadProps = {
  onChange: (result?: string) => void;
  id: string;
};

const CmsProductUpload = ({ id, onChange }: CmsProductUploadProps) => {
  return (
    <Stack w='full' h='full' borderRadius='0.5rem' overflow='hidden'>
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
        <label htmlFor={id}>
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

        <Input
          id={id}
          display='none'
          type='file'
          accept='image/png, image/gif, image/jpeg'
          onChange={async (e) => {
            const { result } = await convertToBase64(
              e.target.files?.[0] as File
            );
            onChange(result);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default CmsProductUpload;
