import React from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';

import AuthForm from './AuthForm';

const LoginForm = () => {
  return (
    <div className="container">
      <h3>Login</h3>
      <AuthForm />
    </div>
  );
};

export default graphql(mutation)(LoginForm);
