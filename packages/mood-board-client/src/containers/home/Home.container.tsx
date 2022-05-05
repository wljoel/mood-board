import React from 'react';

import { cognitoUrl } from '../../services/auth/Auth.service';

const loginUrl = `authorize?response_type=code&client_id=${
  import.meta.env.VITE_REACT_APP_COGNITO_CLIENT_ID
}&redirect_uri=${
  import.meta.env.VITE_REACT_APP_COGNITO_LOGIN_REDIRECT_URI
}&state=STATE`;

const Home: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <h3>Welcome to Mood Board!</h3>
      <button>
        <a href={cognitoUrl + loginUrl} className="underline">
          Log in
        </a>
      </button>
    </div>
  );
};

export default Home;
