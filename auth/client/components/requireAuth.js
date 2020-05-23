import React, { useEffect } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import GET_CURRENT_USER from '../queries/CurrentUser';

export default (WrappedComponent) => {
  const RequireAuth = (props) => {
    const { user, loading } = props.data;

    useEffect(() => {
      if (!user && !loading) {
        hashHistory.push('/login');
      }
    }, [user, hashHistory, loading]);

    return <WrappedComponent {...props} />;
  };

  return graphql(GET_CURRENT_USER)(RequireAuth);
};
