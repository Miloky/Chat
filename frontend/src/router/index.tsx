import { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './protected-route';

import App from '../components/app';
import Login from './login';
import LoginCallback from './login-callback';

import { ApplicationRoutes } from './constants';


const Routes: FunctionComponent = (): ReactElement => {
  return <Router>
    <Switch>
      <ProtectedRoute path='/' exact component={App}/>
      <Route path={ApplicationRoutes.Login} component={Login}/>
      <Route path={ApplicationRoutes.LoginCallback} component={LoginCallback} />
    </Switch>
  </Router>;
};

export default Routes;
