import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import Box from 'Components/Box';

import { PostFragment } from './GetPostsForUser.query';

const PostList = ({ posts }) => (
  <Box>
    {posts.map(post => (
      <Box
        key={post.id}
        borderWidth={2}
        borderStyle="dashed"
        borderColor="primary"
        py={2}
        px={4}
        mb={3}
        borderRadius="normal"
      >
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </Box>
    ))}
  </Box>
);
PostList.propTypes = {
  posts: PropTypes.arrayOf(propType(PostFragment)),
};

export default PostList;
