import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'ramda';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import UserForm from './UserForm';

export const UpdateUser = gql`
  mutation UpdateUser($id: ID!, $first_name: String, $last_name: String) {
    updateUser(id: $id, first_name: $first_name, last_name: $last_name) {
      id
      first_name
      last_name
    }
  }
`;

const UserFormContainer = ({ profile }) => (
  <Mutation mutation={UpdateUser}>
    {(update, { loading, error }) => {
      if (loading) return 'Loading';
      if (error) return 'Error! :(';

      return (
        <UserForm
          initialValues={omit(['id'], profile)}
          onSubmit={values =>
            update({ variables: { id: profile.id, ...values } })
          }
        />
      );
    }}
  </Mutation>
);

UserFormContainer.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default UserFormContainer;
