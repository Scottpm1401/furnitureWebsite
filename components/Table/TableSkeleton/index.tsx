import {
  Skeleton,
  SkeletonProps,
  TableRowProps,
  Td,
  Tr,
} from '@chakra-ui/react';

type Props = {
  rows?: number;
  columns: number;
  skeletonProps?: SkeletonProps;
  tableRowProps?: TableRowProps;
};

const TableSkeleton = ({
  rows = 5,
  columns,
  skeletonProps,
  tableRowProps,
}: Props) => {
  return (
    <>
      {new Array(rows).fill(0).map((rowItem, rowIndex) => (
        <Tr h='56px' key={`${rowItem}_${rowIndex}`} {...tableRowProps}>
          {new Array(columns).fill(1).map((columnItem, columnIndex) => (
            <Td key={`${columnItem}_${columnIndex}`}>
              <Skeleton height='32px' {...skeletonProps} />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
};

export default TableSkeleton;
