import React, { useState } from 'react';

const AuthFornm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="row">
      <form className="col-s4">
        <div className="input-field">
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className="input-field">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default AuthFornm;
