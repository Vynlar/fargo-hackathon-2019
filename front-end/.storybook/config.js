import { configure, addDecorator } from '@storybook/react';
// @ts-ignore

import Decorator from './Decorator';

// Configure global decorator to add theme provider to storybook
addDecorator(Decorator);

// import all the stories at once
let req;
if (process.env.NODE_ENV === 'test') {
  // Require this inside here becauses it causes errors in the browser.
  // We only want to run it inside of jest.
  const requireContext = require('require-context.macro');
  req = requireContext('../src', true, /\.stories\.js$/);
} else {
  req = require.context('../src', true, /\.stories\.js$/);
}

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
