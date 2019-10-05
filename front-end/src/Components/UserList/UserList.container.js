/*
  This component isolates the querying portion of the UserList.
  This helps to maintain separation between the state and the view.
*/
import React from 'react';
import { ifElse, is, mergeDeepWith, nthArg, pipe, both, concat } from 'ramda';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import UserList from './UserList';

/*
  You can export the query here for use in other components.
  Particularly when you want to refresh the results of this query due to a mutation in another component.
  See these docs for an example: https://www.apollographql.com/docs/react/advanced/caching/#updating-after-a-mutation
*/
const query = gql`
  query AllUsers($count: Int!, $page: Int!) {
    users(count: $count, page: $page) {
      data {
        id
        first_name
        last_name
      }
      paginatorInfo {
        hasMorePages
      }
    }
  }
`;

// Use in conjunction with mergeDeepWith when combining results for subsequent paginated queries. See below.
const concatIfArray = ifElse(
  both(
    pipe(
      nthArg(0),
      is(Array)
    ),
    pipe(
      nthArg(1),
      is(Array)
    )
  ),
  concat,
  nthArg(1)
);

const UserListContainer = ({ children }) => (
  <Query
    query={query}
    variables={{
      count: 10,
      page: 1,
    }}
  >
    {({ loading, error, data, fetchMore, variables }) => (
      <UserList
        loading={loading}
        error={error}
        users={pathOr([], ['users', 'data'], data)}
        hasMoreUsers={pathOr(
          false,
          ['users', 'paginatorInfo', 'hasMorePages'],
          data
        )}
        onLoadMore={() =>
          fetchMore({
            variables: {
              page: variables.page + 1,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return mergeDeepWith(concatIfArray, prev, fetchMoreResult);
            },
          })
        }
      />
    )}
  </Query>
);
UserListContainer.propTypes = {
  children: PropTypes.node,
};

export default UserListContainer;
