import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SongList = () => {
  return <div>Song List</div>;
};

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default graphql(query)(SongList);
