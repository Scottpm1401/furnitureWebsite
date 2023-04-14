import { Button, IconButton, Td, Th, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Table from '../../../components/Table';
import TableSkeleton from '../../../components/Table/TableSkeleton';
import { APP_ROUTES } from '../../../constant';
import { useProducts } from '../../../hooks/product';
import CmsContainer from '../../../layout/Container/CmsContainer';
import Page from '../../../layout/Page';
import AdminAuthProvider from '../../../layout/Provider/AdminAuthProvider';
import EditIcon from '../../../public/svg/edit.svg';
import PlusIcon from '../../../public/svg/plus.svg';
import { NextApplicationPage } from '../../_app';

const CmsProducts: NextApplicationPage = () => {
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
    <Page direction='row' w='full' title='Products List'>
      <CmsContainer
        title={t('products_list')}
        search={{ handleSearch: getProductsList }}
        rightElement={
          <Button
            leftIcon={<PlusIcon width={16} height={16} strokeWidth={4} />}
            colorScheme='orange'
            onClick={() => router.push(APP_ROUTES.cms.products.create)}
          >
            {t('create')}
          </Button>
        }
      >
        <Table
          headers={
            <Tr>
              <Th>ID</Th>
              <Th>{t('title')}</Th>
              <Th>{t('categories')}</Th>
              <Th>{t('brand')}</Th>
              <Th>{t('price')}</Th>
              <Th>{t('storage_quantity')}</Th>
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
                        router.push(APP_ROUTES.cms.products.index(product._id))
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
  );
};

CmsProducts.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsProducts;
