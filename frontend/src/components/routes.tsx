import { FunctionComponent, ReactElement, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, RouteProps, Route, Switch, Redirect } from 'react-router-dom';
import authService, { ApplicationPaths } from '../services/auth-service';


export const QUERY_PARAMETER_NAMES = {
  returnUrl: 'returnUrl'
};

const getReturnUrl = (): string => {
  const query = new URLSearchParams(window.location.search);
  const returnUrl = query.get(QUERY_PARAMETER_NAMES.returnUrl);
  const origin = `${window.location.origin}/`;

  if(returnUrl && !returnUrl.startsWith(origin)) {
    // This is an extra check to prevent open redirects
    throw new Error(`Invalid return url (${QUERY_PARAMETER_NAMES.returnUrl}: ${returnUrl}). The return url needs to have the same origin as the current page. `);
  }

  return returnUrl || origin;
};


interface AuthorizedState {
  ready: boolean;
  authenticated: boolean;
}

const authorizedDefaultState: AuthorizedState = {
  ready: false,
  authenticated: false
};

const ProtectedRoute: FunctionComponent<RouteProps> = (props): ReactElement => {
  const [authorized, setAuthorized] = useState<AuthorizedState>(authorizedDefaultState);

  const authenticationChangeHandler = useCallback(():void =>{
    console.log('authenticationChangeHandler');
  },[]);

  useEffect(()=>{
    authService.getUser().then(x=>console.log(x)).catch(err=>console.log(err));
  }, []);



  if(!authorized.authenticated){
    // Route component property path ---> <Route path='/some-route' />
    const url = props.path as string;
    const link = document.createElement('a');
    link.href = url;

    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}/?${QUERY_PARAMETER_NAMES.returnUrl}=${encodeURIComponent(returnUrl)}`;


    return  <Redirect to={redirectUrl} />;
  }

  return <Route {...props} />
};

const Login:FunctionComponent = ():ReactElement => {

  const getReturnUrl = (): string => {
    const params = new URLSearchParams(window.location.search);
    const returnUrl = params.get(QUERY_PARAMETER_NAMES.returnUrl);
    const origin = `${window.location.origin}/`;

    if(returnUrl && !returnUrl.startsWith(origin)){
      throw new Error('Invalid return url. The return url needs to have the same origin as the current page.')
    }

    return returnUrl || origin;
  }

  useEffect(()=>{
    const returnUrl = getReturnUrl();
    alert(returnUrl);
    authService.signIn({ returnUrl });
  }, []);
  return <div>LoginComponent</div>
};

const LoginCallback: FunctionComponent=():ReactElement => {
  return  <div>Logincallback</div>
}


const NotAuthorized = () =>{
  return <div>Not authorized</div>;
}

const Test = () => {
  return <div>Test</div>;
};

const Routes: FunctionComponent = (): ReactElement => {
  return <Router>
    <Switch>
      <ProtectedRoute path='/' exact component={Test} />
      <Route path={ApplicationPaths.LoginCallback} component={LoginCallback} />
      <Route path={ApplicationPaths.Login} exact component={Login} />
      <Route component={NotAuthorized} />
    </Switch>
  </Router>;
};

export default Routes;
