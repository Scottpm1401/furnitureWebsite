import { Flex, FlexProps } from '@chakra-ui/layout';
import React from 'react';
import DatePicker from 'react-datepicker';

type CustomDateProps = {
  currentDate: Date | null;
  callback: (date: Date | null) => void;
  format?: string;
  showTimeSelect?: boolean;
} & FlexProps;

const CustomDatePicker = ({
  currentDate,
  callback,
  format = 'dd/MM/yyyy',
  showTimeSelect,
  ...props
}: CustomDateProps) => {
  return (
    <Flex
      sx={{
        input: {
          background: 'transparent',
          width: '100%',
          border: '1px solid var(--chakra-colors-gray-200)',
          padding: '0 1rem',
          height: 'var(--chakra-sizes-10)',
          borderRadius: 'var(--chakra-radii-md)',
          transition: 'all 200ms ease-in-out',
          outline: 'none',
        },
      }}
      {...props}
    >
      <DatePicker
        dateFormat={format}
        selected={currentDate}
        onChange={(date) => callback(date)}
        showTimeSelect={showTimeSelect}
      />
    </Flex>
  );
};

export default CustomDatePicker;
