/*
  This component wraps each story and injects the theme provider.
  This will allow `styled-system` to correctly style all the components.
  */
import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import theme from '../src/theme';
import GlobalStyles from '../src/GlobalStyles';

const Decorator = story =>
  React.createElement(ThemeProvider, { theme: theme }, [
    React.createElement(GlobalStyles, { key: 'styles' }),
    React.createElement(story, { key: 'story' }),
  ]);

export default Decorator;
