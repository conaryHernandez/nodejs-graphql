import gql from 'graphql-tag';

export const mutationAddLyric = gql`
  mutation AddLyric($songId: ID!, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
