import { Flex, FlexProps } from '@chakra-ui/layout';
import { css } from '@emotion/react';
import React from 'react';
import DatePicker from 'react-datepicker';

type CustomDateProps = {
  currentDate: Date | null;
  callback: (date: Date | null) => void;
  format?: string;
} & FlexProps;

const CustomDatePicker = ({
  currentDate,
  callback,
  format = 'dd/MM/yyyy',
  ...props
}: CustomDateProps) => {
  return (
    <Flex
      css={css`
        input {
          width: 100%;
          border: 1px solid var(--chakra-colors-gray-200);
          padding: 0 1rem;
          height: var(--chakra-sizes-10);
          border-radius: var(--chakra-radii-md);
          transition: all 200ms ease-in-out;
        }
      `}
      {...props}
    >
      <DatePicker
        dateFormat={format}
        selected={currentDate}
        onChange={(date) => callback(date)}
      />
    </Flex>
  );
};

export default CustomDatePicker;
