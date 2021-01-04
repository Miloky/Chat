// TODO: Import from .env
export const ApplicationName = 'chat_web_client';

export const QueryParameters = {
  ReturnUrl: 'returnUrl'
};

export const LoginActions = {
  Login: 'login',
  LoginCallback: 'login-callback'
};

const prefix = '/authentication';
export const ApplicationRoutes = {
  Login: `${prefix}/${LoginActions.Login}`,
  LoginCallback: `${prefix}/${LoginActions.LoginCallback}`,
  ApiAuthorizationClientConfigurationUrl: `https://localhost:5001/_configuration/${ApplicationName}`
};


enum AuthenticationResultStatus {
  Redirect,
  Error,
  Success
}

const getReturnUrl = (): string => {
  const origin = `${window.location.origin}/`;
  const params = new URLSearchParams(window.location.search);
  const returnUrl = params.get(QueryParameters.ReturnUrl);

  return returnUrl || origin;
};


export { AuthenticationResultStatus, getReturnUrl };


