const hoistNonReactStatics = require('hoist-non-react-statics');

module.exports = {
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  defaultNS: 'common',
  staticsHoc: hoistNonReactStatics,
  pages: {
    '*': ['common'],
  },
};
