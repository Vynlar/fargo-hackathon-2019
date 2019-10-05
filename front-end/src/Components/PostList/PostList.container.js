import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import PostList from './PostList';
import GetPostsForUser from './GetPostsForUser.query';

const PostListContainer = ({ userId }) => (
  <Query query={GetPostsForUser} variables={{ user_id: userId }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error :(';
      return <PostList posts={data.user.posts} />;
    }}
  </Query>
);
PostListContainer.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default PostListContainer;
