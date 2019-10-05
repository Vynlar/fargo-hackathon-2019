/*
  This component is responsible only for the rendering of data. It should be pure and stateless.
  If you need to handle state or queries, do so in a wrapping component. See `./UserList.container.js`
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from 'Components/Box';
import Text from 'Components/Text';
import Button from 'Components/Button';

const UserList = ({ loading, error, users, onLoadMore, hasMoreUsers }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {users.map(user => (
        <Link
          key={user.id}
          to={`/private/user/${user.id}`}
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <Box bg="primary" mb={3} p={3} mx={4} borderRadius="normal">
            <Text color="black" textDecoration="none">
              {user.first_name} {user.last_name}
            </Text>
          </Box>
        </Link>
      ))}
      {hasMoreUsers ? (
        <Button onClick={onLoadMore}>Load more</Button>
      ) : (
        <Box p={3} justifyContent="center">
          No more users!
        </Box>
      )}
    </div>
  );
};
UserList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    })
  ),
  onLoadMore: PropTypes.func,
  hasMoreUsers: PropTypes.bool,
};

export default UserList;
