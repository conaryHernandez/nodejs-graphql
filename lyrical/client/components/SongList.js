import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import { querySongList } from '../queries/fetchSongs';

const SongList = ({ data }) => {
  const renderSongs = () => {
    return data.songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons red-text" onClick={() => deleteSong(id)}>
          delete
        </i>
      </li>
    ));
  };

  if (data.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <Link
        to="/songs/new"
        className="btn-floating btn-large blue darken-2 right"
      >
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default graphql(querySongList)(SongList);
