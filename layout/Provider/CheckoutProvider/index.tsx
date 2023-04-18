import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect } from 'react';

import Loader from '../../../components/Loader';
import { APP_ROUTES } from '../../../constant';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';
import { productCheck } from '../../../services/payment';

type Props = { children: JSX.Element };

const CheckoutProvider = ({ children }: Props) => {
  const router = useRouter();
  const userCart = useAppSelector(selectors.user.selectUserCart);
  const [verified, setVerified] = React.useState(false);
  const toast = useToast();
  const { t } = useTranslation();

  const checkCart = useCallback(async () => {
    try {
      const checkReq = await userCart.map(
        async (item) => await productCheck(item.product_id, item.quantity)
      );
      const res = await Promise.all(checkReq);
      const isAvailable = res.every((item) => item.success === true);
      return isAvailable;
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: t(err.response?.data.message),
          duration: 5000,
          status: 'error',
          position: 'top-right',
        });

        return false;
      }
    }
  }, [t, toast, userCart]);

  useEffect(() => {
    if (!router.isReady) return;
    checkCart().then((value) => {
      if (!value) {
        setVerified(false);
        router.push(APP_ROUTES.cart);
      } else {
        setVerified(true);
      }
    });
  }, [checkCart, router]);

  if (verified) return children;

  return <Loader />;
};

export default CheckoutProvider;
