import { FunctionComponent, ReactElement, useCallback, useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthService from './auth-service';
import { QueryParameters } from './constants';

interface State {
  authenticated: boolean;
  ready: boolean;
}

const DefaultState: State = {
  authenticated: false,
  ready: false
};

const ProtectedRoute: FunctionComponent<RouteProps> = (props): ReactElement => {
  const [{ ready, authenticated }, setState] = useState<State>(DefaultState);
  const [subscriptionId, setSubscriptionId] = useState<number>();

  const checkAuthentication = useCallback(async () => {
    const authenticated = await AuthService.isUserAuthenticated();
    setState({ ready: true, authenticated });
  }, [setState]);

  const authenticationChange = useCallback(async () => {
    setState(DefaultState);
    await checkAuthentication();
  }, [checkAuthentication, setState]);

  // TODO: Add subscription for auth state change

  useEffect(() => {
    const subscriptionId = AuthService.subscribe(() => authenticationChange());
    setSubscriptionId(subscriptionId);
    checkAuthentication();
  }, [checkAuthentication, authenticationChange, setSubscriptionId]);

  useEffect(() => {
    return (): void => {
      if (subscriptionId !== undefined) {
        AuthService.unsubscribe(subscriptionId);
      }
    };
  }, [subscriptionId]);

  if (typeof props.path !== 'string') {
    throw new Error(`Invalid path prop: ${props.path}`);
  }

  let link = document.createElement('a');
  link.href = props.path;
  const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
  const redirectUrl = `/authentication/login/?${QueryParameters.ReturnUrl}=${encodeURIComponent(returnUrl)}`;

  if (!ready) {
    return <div/>;
  } else if (!authenticated) {
    return <Redirect to={redirectUrl}/>;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;

