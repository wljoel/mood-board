import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { CognitoToken, UserProps } from '../../../../shared/types/User';

export const cognitoUrl = `https://${
  import.meta.env.VITE_REACT_APP_COGNITO_DOMAIN
}.auth.${import.meta.env.VITE_REACT_APP_COGNITO_AWS_REGION}.amazoncognito.com/`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: cognitoUrl }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getCognitoToken: builder.mutation<CognitoToken, string>({
      query: (code) => ({
        url: 'oauth2/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&redirect_uri=${
          import.meta.env.VITE_REACT_APP_COGNITO_LOGIN_REDIRECT_URI
        }&client_id=${
          import.meta.env.VITE_REACT_APP_COGNITO_CLIENT_ID
        }&code=${code}`,
      }),
    }),
    getUserInfo: builder.query<UserProps, string>({
      query: (accessToken) => ({
        url: 'oauth2/userInfo',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    logout: builder.query<any, any>({
      query: () => ({
        url: 'logout',
        method: 'GET',
        headers: {
          client_id: import.meta.env.VITE_REACT_APP_COGNITO_CLIENT_ID,
          logout_uri: import.meta.env.VITE_REACT_APP_COGNITO_LOGIN_REDIRECT_URI,
        },
      }),
    }),
  }),
});

export const {
  useGetCognitoTokenMutation,
  useGetUserInfoQuery,
  useLogoutQuery,
} = authApi;
