import gql from 'graphql-tag';

export const querySongList = gql`
  query SongList {
    songs {
      id
      title
    }
  }
`;
