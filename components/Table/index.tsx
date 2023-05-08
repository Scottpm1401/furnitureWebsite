import {
  IconButton,
  IconButtonProps,
  Select,
  Stack,
  Table as ChakraTable,
  TableBodyProps,
  TableHeadProps,
  TableProps,
  Tbody,
  Text,
  Thead,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import NavigateBeforeIcon from '../../public/svg/arrow_left.svg';
import NavigateNextIcon from '../../public/svg/arrow_right.svg';
import CSVButton, { CSVProps } from '../CSVButton';

type LabelDisplayedRowsProps = {
  from: number;
  to: number;
  count: number;
};

const LabelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsProps) => {
  const { t } = useTranslation();

  const calcFrom = () => {
    if (from === 0) return to > 0 ? from + 1 : from;
    return to === 0 ? 0 : from + 1;
  };

  const calcTo = () => {
    if (from !== 0 && to === 0) return 0;
    return from + to;
  };

  return <Text>{`${calcFrom()} - ${calcTo()} / ${count} ${t('result')}`}</Text>;
};

type Props = {
  headers: React.ReactNode;
  body: React.ReactNode;
  headerProps?: TableHeadProps;
  bodyProps?: TableBodyProps;
  tableProps?: TableProps;
  tablePaginationProps: {
    labelDisplayedRows?: LabelDisplayedRowsProps;
    rowsPerPage: number;
    prevButtonProps: IconButtonProps;
    nextButtonProps: IconButtonProps;
    rowsPerPageOptions?: number[];
    onChangeRowsPerPage(rowNumber: number): void;
  };
  csv?: CSVProps;
};

const Table = ({
  headers,
  body,
  headerProps,
  bodyProps,
  tableProps,
  tablePaginationProps,
  csv,
}: Props) => {
  const {
    labelDisplayedRows,
    rowsPerPage,
    prevButtonProps,
    nextButtonProps,
    rowsPerPageOptions = [10, 30, 50, 100],
    onChangeRowsPerPage,
  } = tablePaginationProps;

  const { t, lang } = useTranslation();

  return (
    <Stack
      bg='white'
      borderRadius='4px'
      boxShadow='rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px'
    >
      <ChakraTable {...tableProps}>
        <Thead {...headerProps}>{headers}</Thead>
        <Tbody {...bodyProps}>{body}</Tbody>
      </ChakraTable>
      <Stack
        direction='row'
        justifyContent={csv ? 'space-between' : 'flex-end'}
        px={2}
        py={1}
      >
        {csv && (
          <CSVButton
            data={csv.data}
            headers={csv.headers}
            filename={csv.filename}
          />
        )}
        <Stack direction='row' alignItems='center' spacing={3}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Text>{t('on_1_page')}</Text>
            <Select
              onChange={(e) => onChangeRowsPerPage(+e.target.value)}
              value={rowsPerPage}
              w='80px'
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Text>{t('view_threads')}</Text>
          </Stack>
          {labelDisplayedRows && <LabelDisplayedRows {...labelDisplayedRows} />}
          <Stack direction='row' spacing={2} alignItems='center'>
            <IconButton
              p='6px'
              icon={<NavigateBeforeIcon style={{ stroke: 'black' }} />}
              {...prevButtonProps}
            />
            <IconButton
              p='6px'
              icon={<NavigateNextIcon style={{ stroke: 'black' }} />}
              {...nextButtonProps}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Table;
