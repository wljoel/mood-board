import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserProps } from '../../../../shared/types/User';
import type { OmitId } from '../../../../shared/types/utility.types';

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
  message: string | null;
  currentUser: OmitId<UserProps> | null;
}

const initialState: AuthState = {
  loading: false,
  authenticated: false,
  message: null,
  currentUser: null,
};

const cuUsername = 'currentUser-username';
const cuEmail = 'currentUser-email';
const cuSub = 'currentUser-sub';
const cuEmailVerified = 'currentUser-email_verified';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUserInformation: (state) => {
      state.loading = true;
      state.message = null;
    },
    loadedUserInformation: (state, action: PayloadAction<UserProps>) => {
      state.loading = false;
      state.authenticated = true;
      state.message = 'Authentication successful';
      state.currentUser = action.payload;

      localStorage.setItem(cuUsername, action.payload.username);
      localStorage.setItem(cuEmail, action.payload.email);
      localStorage.setItem(cuSub, action.payload.sub);
      localStorage.setItem(
        cuEmailVerified,
        action.payload.email_verified.toString()
      );
    },
    loadUserInformationFromLocalStorage: (state) => {
      const username = localStorage.getItem(cuUsername);
      const email = localStorage.getItem(cuEmail);
      const sub = localStorage.getItem(cuSub);
      const email_verified = localStorage.getItem(cuEmailVerified);

      if (username && email && sub && email_verified) {
        state.authenticated = true;
        state.currentUser = {
          username,
          email,
          sub,
          email_verified: email_verified !== 'false',
        };
      }
    },
    logoutUser: (state) => {
      state.authenticated = false;
      state.message = 'Logged out';
      state.currentUser = null;
    },
    failUserInformation: (state) => {
      state.loading = false;
      state.authenticated = false;
      state.message = 'Authentication failed';
      state.currentUser = null;
    },
  },
});

export const {
  loadUserInformation,
  loadedUserInformation,
  loadUserInformationFromLocalStorage,
  logoutUser,
  failUserInformation,
} = authSlice.actions;
export default authSlice.reducer;
