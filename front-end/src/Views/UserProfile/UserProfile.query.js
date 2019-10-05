import gql from 'graphql-tag';

export const ProfileFragment = gql`
  fragment Profile on User {
    id
    first_name
    last_name
    email
  }
`;

const GetUserProfile = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      ...Profile
    }
  }
  ${ProfileFragment}
`;

export default GetUserProfile;
