import React, { useState } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

const LoginForm = ({ mutate }) => {
  const [errors, setErrors] = useState([]);

  const onSubmit = ({ email, password }) => {
    mutate({
      variables: { email, password },
      refetchQueries: [{ query }],
      awaitRefetchQueries: true,
    })
      .then(() => hashHistory.push('/dashboard'))
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);

        setErrors(errors);
      });
  };

  return (
    <div className="container">
      <h3>Login</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
};

export default graphql(mutation)(graphql(query)(LoginForm));
