import React from 'react';
import { useDispatch } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner.component';
import { logoutUser } from '../../features/auth/authSlice';
import { useLogoutQuery } from '../../services/auth/Auth.service';

const Logout: React.FC = () => {
  useLogoutQuery();
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(logoutUser());
    window.location.href = 'http://localhost:3000/';
  }, 2000);

  return (
    <div className="flex flex-col items-center">
      <Spinner />
      <h2>Logging out</h2>
    </div>
  );
};

export default Logout;
