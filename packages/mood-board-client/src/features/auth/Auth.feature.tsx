import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  useGetCognitoTokenMutation,
  useGetUserInfoQuery,
} from '../../services/auth/Auth.service';

import { loadedUserInformation, loadUserInformation } from './authSlice';

export function useValidateSession(): void {
  const dispatch = useDispatch();

  const code = new URLSearchParams(useLocation().search).get('code');
  const [getCognitoTokenMutation, { data: cognitoToken }] =
    useGetCognitoTokenMutation();

  useEffect(() => {
    if (code) {
      dispatch(loadUserInformation());
      getCognitoTokenMutation(code);
    }
  }, [code]);

  const { data: userInfo } = useGetUserInfoQuery(
    cognitoToken?.access_token as string
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(loadedUserInformation(userInfo));
    }
  }, [userInfo]);
}
