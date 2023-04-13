import { Button, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { APP_ROUTES } from '../../../constant';
import { useResponsive } from '../../../hooks/responsive';
import Container from '../../Container';

export default function ScreenSizeFilteringProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobileOrTablet } = useResponsive();
  const { t } = useTranslation();

  if (isMobileOrTablet)
    return (
      <Stack
        h='full'
        w='full'
        position='fixed'
        bg='white'
        justifyContent='center'
        alignItems='center'
      >
        <Container>
          <Stack spacing={4} textAlign='center' w='full'>
            <Text>{t('not_support_resolution')}</Text>
            <Link href={APP_ROUTES.home}>
              <Button colorScheme='orange'>{t('back_to_home')}</Button>
            </Link>
          </Stack>
        </Container>
      </Stack>
    );

  return <>{children}</>;
}
