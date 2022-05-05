/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_COGNITO_DOMAIN: string;
  readonly VITE_REACT_APP_COGNITO_AWS_REGION: string;
  readonly VITE_REACT_APP_COGNITO_CLIENT_ID: string;
  readonly VITE_REACT_APP_COGNITO_LOGIN_REDIRECT_URI: string;
  readonly VITE_REACT_APP_COGNITO_LOGOUT_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
