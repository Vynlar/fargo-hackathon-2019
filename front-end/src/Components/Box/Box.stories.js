import React from 'react';
import { storiesOf } from '@storybook/react';

import Box from './Box';

storiesOf('Layout|Box', module)
  .add('Basic box', () => <Box>Hello world!</Box>, {
    notes: `
# Component documentation
This area can be used to write documentation in markdown.
It's helpful to include an explanation of what the component does here if it is not obvious.
    `,
  })
  .add('Basic coloring', () => (
    <Box bg="red" color="white">
      Hello world!
    </Box>
  ))
  .add('Theme coloring', () => (
    <Box bg="primary" color="white">
      Hello world!
    </Box>
  ))
  .add('Layout', () => (
    <Box bg="primary" color="white" p={1} height={300}>
      Hello world!
    </Box>
  ));
