import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { LoginForm } from './Login';
import FlexBox from 'Components/FlexBox';

/*
Note: Instead of importing the default value from './Login' we are instead grabbing only the form.
This prevents us from having to deal with react-router here inside of Storybook.
Always try to keep storybook components isolated to help with both Storybook and unit testing.
*/
storiesOf('Views|Login form', module)
  .addDecorator(story => <FlexBox>{story()}</FlexBox>)
  .add('Login form', () => <LoginForm onSubmit={action('submitted')} />);
