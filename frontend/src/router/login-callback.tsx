import { FunctionComponent, ReactElement, useCallback, useEffect } from 'react';
import AuthService from './auth-service';
import { AuthenticationResultStatus, QueryParameters } from './constants';

const getReturnUrl = (state: any) => {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get(QueryParameters.ReturnUrl);
  if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
    // This is an extra check to prevent open redirects.
    throw new Error('Invalid return url. The return url needs to have the same origin as the current page.');
  }
  return (state && state.returnUrl) || fromQuery || `${window.location.origin}/`;
};

const LoginCallback:FunctionComponent = (): ReactElement => {

  const process = useCallback(async (): Promise<void> =>{
    const url = window.location.href;
    const result = await AuthService.completeSingIn(url);
    switch (result.status){
    case AuthenticationResultStatus.Redirect:
      throw new Error('Should not redirect.');
    case AuthenticationResultStatus.Success:
      window.location.replace(getReturnUrl(result.state));
      break;
    // TODO: Handle fail
    default:
      throw new Error(`Invalid authentication result status '${result.status}'`);

    }
  },[]);

  useEffect(()=>{
    process();
  },[process])

  return  <div>Process login callback...</div>;
}

export default LoginCallback;
