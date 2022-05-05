import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner.component';
import { useValidateSession } from '../../features/auth/Auth.feature';
import { loadUserInformationFromLocalStorage } from '../../features/auth/authSlice';
import type { RootState } from '../../store';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  useValidateSession();

  const { currentUser, message, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!currentUser) {
      dispatch(loadUserInformationFromLocalStorage());
    }
  }, [currentUser]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center">
      <h1 className="">{message}</h1>
      <Link to="/boards">Go to Boards</Link>
    </div>
  );
};

export default Login;
