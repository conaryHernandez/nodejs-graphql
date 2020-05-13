import React from 'react';
import { Link } from 'react-router';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SongList = ({ data }) => {
  const renderSongs = () => {
    return data.songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        <Link to={`/song/${id}`}>{title}</Link>
        <i className="material-icons red-text" onClick={() => deleteSong(id)}>
          delete
        </i>
      </li>
    ));
  };

  if (data.loading) {
    return <div>Loading...</div>;
  }

  return <ul className="collection">{renderSongs()}</ul>;
};

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default graphql(query)(SongList);
