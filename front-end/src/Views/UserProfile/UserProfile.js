import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import Box from 'Components/Box';
import UserForm from './components/UserForm';
import { ProfileFragment } from './UserProfile.query';
import PostList from 'Components/PostList';

const UserProfile = ({ loading, error, profile }) => {
  if (loading) return 'Loading...';
  if (error) return 'Error :(';

  return (
    <Box p={4}>
      <h2>Profile</h2>
      <div>
        Name: {profile.first_name} {profile.last_name}
      </div>
      <div>Email: {profile.email}</div>

      <h2>Edit</h2>
      <UserForm profile={profile} />

      <h2>{profile.first_name}&apos;s Posts</h2>
      <PostList userId={profile.id} />
    </Box>
  );
};
UserProfile.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  profile: propType(ProfileFragment),
};

export default UserProfile;
