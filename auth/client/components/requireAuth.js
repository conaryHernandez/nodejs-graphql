import React, { useEffect } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import GET_CURRENT_USER from '../queries/CurrentUser';

const RequireAuth = ({ data }) => {
  const { user, loading } = data;

  useEffect(() => {
    if (user && !loading) {
      hashHistory.push('/login');
    }
  }, [user, hashHistory, loading]);
};

graphql(GET_CURRENT_USER)(RequireAuth);
