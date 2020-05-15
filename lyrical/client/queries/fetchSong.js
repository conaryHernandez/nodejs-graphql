import gql from 'graphql-tag';

export const querySong = gql`
  query Song($id: ID!) {
    song(id: $id) {
      id
      title
    }
  }
`;
