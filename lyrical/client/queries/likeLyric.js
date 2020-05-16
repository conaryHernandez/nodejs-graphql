import gql from 'graphql-tag';

export const mutationLikeLyric = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
