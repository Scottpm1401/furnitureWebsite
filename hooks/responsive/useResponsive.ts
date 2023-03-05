import { useBreakpointValue } from '@chakra-ui/react';

const useResponsive = () => {
  const isSmallDevice = useBreakpointValue({
    sm: false,
    base: true,
  });

  const isMobile = useBreakpointValue({
    md: false,
    base: true,
  });

  const isMobileOrTablet = useBreakpointValue({
    lg: false,
    base: true,
  });

  const isTabletOrLaptop = useBreakpointValue({
    xl: false,
    base: true,
  });

  const isBigScreen = useBreakpointValue({
    '2xl': false,
    base: true,
  });

  return {
    isBigScreen,
    isMobile,
    isMobileOrTablet,
    isSmallDevice,
    isTabletOrLaptop,
  };
};

export default useResponsive;
