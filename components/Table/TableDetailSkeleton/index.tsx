import {
  Skeleton,
  SkeletonProps,
  Table,
  TableRowProps,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

import { BORDER_COLOR } from '../../../constant';

type Props = {
  skeletonProps?: SkeletonProps;
  rows?: number;
  tableRowProps?: TableRowProps;
};

const TableDetailSkeleton = ({
  skeletonProps,
  tableRowProps,
  rows = 5,
}: Props) => {
  return (
    <Table
      variant='unstyled'
      border={`1px solid ${BORDER_COLOR}`}
      borderBottom='none'
    >
      <Tbody>
        {new Array(rows).fill(0).map((rowItem, rowIndex) => (
          <Tr
            h='56px'
            key={`${rowItem}_${rowIndex}`}
            borderBottom={`1px solid ${BORDER_COLOR}`}
            {...tableRowProps}
          >
            <Td w='20%' bg='blackAlpha.300'>
              <Skeleton height='32px' {...skeletonProps} />
            </Td>

            <Td w='80%'>
              <Skeleton height='32px' {...skeletonProps} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableDetailSkeleton;
