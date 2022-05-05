export interface UserProps {
  _id: string;
  username: string;
  email: string;
  sub: string;
  email_verified: boolean;
}

export interface CognitoToken {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
}

export interface CreateOrReadUserMutation extends UserProps {
}

export interface DeleteUserMutation {
  sub: string;
}
