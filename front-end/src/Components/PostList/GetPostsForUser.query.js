import gql from 'graphql-tag';

export const PostFragment = gql`
  fragment PostContent on Post {
    id
    body
    title
  }
`;

const GetPostsForUser = gql`
  query GetPosts($user_id: ID!) {
    user(id: $user_id) {
      id
      posts {
        ...PostContent
      }
    }
  }
  ${PostFragment}
`;

export default GetPostsForUser;
