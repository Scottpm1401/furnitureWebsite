// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: {
      '@font-face': {
        fontFamily: 'Roboto',
        src: "url('/fonts/Roboto/Roboto-Regular.ttf')",
      },
      'html, body': {
        fontFamily: `'Roboto', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
        padding: 0,
        margin: 0,
        'scroll-behavior': 'smooth',
      },
    },
  },
});

export default theme;
