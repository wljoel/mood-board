import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL, UserCRUD } from '../../../../shared/constants';
import type {
  CreateOrReadUserMutation,
  DeleteUserMutation,
  UserProps,
} from '../../../../shared/types/User';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL + 'users/' }),
  tagTypes: ['Post', 'Delete'],
  endpoints: (builder) => ({
    [UserCRUD.createOrRead]: builder.mutation<
      UserProps,
      CreateOrReadUserMutation
    >({
      query: (user: CreateOrReadUserMutation) => ({
        url: '' + user.sub,
        method: 'POST',
        body: user,
      }),
    }),
    [UserCRUD.delete]: builder.mutation<UserProps, DeleteUserMutation>({
      query: (user: DeleteUserMutation) => ({
        url: '' + user.sub,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  // @ts-ignore
  useCreateOrReadUserMutation,
  // @ts-ignore
  useDeleteUserMutation,
} = usersApi;
