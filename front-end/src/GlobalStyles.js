import React from 'react';
import { Global, css } from '@emotion/core';

const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        font-family: sans-serif;
      }
    `}
  />
);

export default GlobalStyles;
