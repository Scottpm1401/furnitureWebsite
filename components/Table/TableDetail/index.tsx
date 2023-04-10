import {
  IconButton,
  Input,
  InputProps,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  TextProps,
  Tr,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

import { BORDER_COLOR } from '../../../constant';
import CheckIcon from '../../../public/svg/check.svg';
import CloseIcon from '../../../public/svg/close.svg';
import EditIcon from '../../../public/svg/edit.svg';
import { isText } from '../../../utils/common';

export interface TableDetailRowProps {
  title: string;
  content: React.ReactNode;
  isHidden?: boolean;
  textProps?: TextProps;
  edit?: {
    inputProps?: InputProps;
    customInput?: React.ReactNode;
    error?: string;
    isInit: boolean;
  };
}

interface TableDetailProps {
  rows: TableDetailRowProps[];
}

const TableDetailRow = ({ row }: { row: TableDetailRowProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { title, content, edit, textProps } = row;
  const isContentText = isText(content) || content === undefined;
  const renderContent = useCallback(
    () => (
      <Stack w='full' spacing={0}>
        {isContentText ? (
          <Text w='full' {...textProps}>
            {content}
          </Text>
        ) : (
          content
        )}
        {edit?.error && <Text color='red.600'>{edit.error}</Text>}
      </Stack>
    ),
    [content, edit?.error, isContentText, textProps]
  );

  return (
    <Tr height='90px' borderBottom={`1px solid ${BORDER_COLOR}`}>
      <Td w='20%' bg='blackAlpha.300'>
        <Text fontWeight='semibold'>{title}</Text>
      </Td>
      <Td w='80%' maxW='800px'>
        {edit ? (
          isEditing ? (
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={3}
            >
              <Stack w='full' spacing={2}>
                {edit.customInput ? (
                  edit.customInput
                ) : (
                  <Input
                    autoFocus
                    onBlur={() => setIsEditing(false)}
                    value={content as string}
                    {...edit.inputProps}
                  />
                )}
                {edit?.error && <Text color='red.600'>{edit.error}</Text>}
              </Stack>

              <IconButton
                minW='unset'
                p='6px'
                minWidth='32px'
                w='32px'
                h='32px'
                colorScheme='orange'
                icon={
                  edit.isInit ? (
                    <CloseIcon style={{ stroke: 'white' }} />
                  ) : (
                    <CheckIcon
                      style={{
                        stroke: 'white',
                      }}
                    />
                  )
                }
                aria-label={`confirm_icon_${title}`}
                onClick={() => setIsEditing(false)}
              />
            </Stack>
          ) : (
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={3}
            >
              {renderContent()}

              <IconButton
                minW='unset'
                p='6px'
                w='32px'
                h='32px'
                colorScheme='orange'
                icon={<EditIcon />}
                aria-label={`edit_icon_${title}`}
                onClick={() => setIsEditing(true)}
              />
            </Stack>
          )
        ) : (
          renderContent()
        )}
      </Td>
    </Tr>
  );
};

const TableDetail = ({ rows }: TableDetailProps) => {
  return (
    <Table
      variant='unstyled'
      border={`1px solid ${BORDER_COLOR}`}
      borderBottom='none'
    >
      <Tbody>
        {rows.map((row) => (
          <TableDetailRow row={row} key={row.title} />
        ))}
      </Tbody>
    </Table>
  );
};

export default TableDetail;
