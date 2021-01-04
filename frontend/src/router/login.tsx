import { FunctionComponent, ReactElement, useCallback, useEffect } from 'react';

import { getReturnUrl } from './constants';
import AuthService from './auth-service';


const Login: FunctionComponent = (): ReactElement => {

  const login = useCallback(async (): Promise<void> => {
    const returnUrl = getReturnUrl();
    const state = { returnUrl };
    await AuthService.signIn(state);
    // TODO: Handle result;
  }, []);

  useEffect(()=>{
    login();
  }, [login]);

  return  <div>Login...</div>
};

export default Login;
