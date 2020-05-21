import React from 'react';

import { graphql } from 'react-apollo';

import query from '../queries/CurrentUser';

const Header = ({ data }) => {
  console.log('data', data);

  return (
    <div>
      <h3>Component Header</h3>
      <span>Login</span>
    </div>
  );
};

export default graphql(query)(Header);
