import React from 'react';
import { storiesOf } from '@storybook/react';
import { MockedProvider } from 'react-apollo/test-utils';

import UserProfileContainer from './UserProfile.container';
import GetUserProfile from './UserProfile.query';

const mocks = [
  {
    request: {
      query: GetUserProfile,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        user: {
          id: '1',
          first_name: 'Bobby',
          last_name: 'Bobberson',
          email: 'bob123@gmail.com',
        },
      },
    },
  },
];

storiesOf('UserProfile', module).add('Success', () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <UserProfileContainer match={{ params: { userId: '1' } }} />
  </MockedProvider>
));
