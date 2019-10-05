import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UserForm from './UserForm';

storiesOf('UserForm', module)
  .add('Empty', () => <UserForm onSubmit={action('submit')} />)
  .add('Prefilled', () => (
    <UserForm
      onSubmit={action('submit')}
      initialValues={{ first_name: 'Adrian', last_name: 'Aleixandre' }}
    />
  ));
