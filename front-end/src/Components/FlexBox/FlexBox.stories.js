import React from 'react';
import { storiesOf } from '@storybook/react';

import FlexBox from './FlexBox';
import docs from './FlexBox.docs.md';

storiesOf('Layout|FlexBox', module)
  .add('Basic box', () => <FlexBox>Hello world!</FlexBox>)
  .add('Position children', () => (
    <FlexBox bg="primary" justifyContent="space-around" alignItems="center">
      <p>Hello</p>
      <p>World</p>
    </FlexBox>
  ))
  .add(
    'column',
    () => (
      <FlexBox col>
        <p>This is on top</p>
        <p>This is on bottom</p>
      </FlexBox>
    ),
    {
      notes: docs,
    }
  );
