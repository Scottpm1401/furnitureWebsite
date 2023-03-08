import { IconButton, Td, Th, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Table from '../../../components/Table';
import TableSkeleton from '../../../components/Table/TableSkeleton';
import { APP_ROUTES } from '../../../constant';
import { useProducts } from '../../../hooks/product';
import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';
import Page from '../../../layout/Page';
import EditIcon from '../../../public/svg/edit.svg';

type Props = {};

const CmsProducts = (props: Props) => {
  const {
    total,
    isLoading,
    products,
    offset,
    limit,
    search,
    getProductsList,
    hasNext,
    hasPrevious,
  } = useProducts();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Products List'>
        <CmsContainer
          title={t('products_list')}
          search={{ handleSearch: getProductsList }}
        >
          <Table
            headers={
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Brand</Th>
                <Th>Price</Th>
                <Th>Storage Quantity</Th>
                <Th></Th>
              </Tr>
            }
            body={
              !isLoading ? (
                products.map((product) => (
                  <Tr key={product._id}>
                    <Td>{product._id.slice(0, 5)}</Td>
                    <Td>{product.title}</Td>
                    <Td>{t(product.category)}</Td>
                    <Td>{t(product.brand)}</Td>
                    <Td>${product.price}</Td>
                    <Td>{product.storage_quantity}</Td>
                    <Td>
                      <IconButton
                        minW='unset'
                        p='6px'
                        w='32px'
                        h='32px'
                        colorScheme='orange'
                        icon={<EditIcon />}
                        aria-label={`edit_icon_${product._id}`}
                        onClick={() =>
                          router.push(APP_ROUTES.cmsProduct(product._id))
                        }
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <TableSkeleton columns={7} />
              )
            }
            tablePaginationProps={{
              labelDisplayedRows: {
                from: offset,
                to: products.length,
                count: total,
              },
              prevButtonProps: {
                disabled: !hasPrevious,
                onClick: () => getProductsList(offset - limit, limit, search),
                'aria-label': 'Prev navigation',
              },
              nextButtonProps: {
                disabled: !hasNext,
                onClick: () => getProductsList(offset + limit, limit, search),
                'aria-label': 'Next navigation',
              },
              rowsPerPage: limit,
              onChangeRowsPerPage: (rowNumber) =>
                getProductsList(0, rowNumber, search),
            }}
          />
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsProducts;
