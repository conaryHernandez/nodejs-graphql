import React, { useState } from 'react';

const AuthFornm = ({ onSubmit, errors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    onSubmit({ email, password });
  };

  return (
    <div className="row">
      <form className="col-s4" onSubmit={onSubmitHandler}>
        <div className="input-field">
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="input-field">
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="errors">
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default AuthFornm;
