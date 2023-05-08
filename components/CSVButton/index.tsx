import { Button, Text } from '@chakra-ui/react';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { CSVLink } from 'react-csv';

import DownloadIcon from '../../public/svg/download.svg';
import { formatShortDate } from '../../utils/common';

export type CSVProps = {
  data: any;
  headers: any;
  filename: string;
  buttonLabel?: string;
};

const CSVButton = ({
  data,
  filename,
  headers,
  buttonLabel = 'CSV',
}: CSVProps) => {
  const { lang } = useTranslation();

  return (
    <CSVLink
      data={data}
      filename={`${filename}_${lang}_${formatShortDate(moment().toDate())}.csv`}
      headers={headers}
    >
      <Button
        rightIcon={<DownloadIcon width='24px' height='24px' />}
        colorScheme='green'
      >
        <Text fontWeight='bold' fontSize='md'>
          {buttonLabel}
        </Text>
      </Button>
    </CSVLink>
  );
};

export default CSVButton;
