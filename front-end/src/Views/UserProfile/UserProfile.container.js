import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { path } from 'ramda';

import UserProfile from './UserProfile';
import GetUserProfile from './UserProfile.query';

const UserProfileContainer = ({ match }) => (
  <Query
    query={GetUserProfile}
    variables={{
      id: match.params.userId,
    }}
  >
    {({ loading, error, data }) => (
      <UserProfile
        loading={loading}
        error={error}
        profile={path(['user'], data)}
      />
    )}
  </Query>
);
UserProfileContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }),
};

export default UserProfileContainer;
