import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

const Header = ({ data, mutate }) => {
  const onLogoutHandler = () => {
    mutate({
      refetchQueries: [{ query }],
    });
  };

  const renderButtons = () => {
    const { loading, user } = data;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (user) {
      return (
        <li>
          <Link to="#" onClick={onLogoutHandler.bind(this)}>
            Logout
          </Link>
        </li>
      );
    }

    return (
      <>
        <li>
          <Link to="/signup">SignUp </Link>
        </li>
        <li>
          <Link to="/login">Login </Link>
        </li>
      </>
    );
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  );
};

export default graphql(mutation)(graphql(query)(Header));
