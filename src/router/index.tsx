import React from 'react';
import { Switch } from 'react-router-dom';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';
import Main from '../components/main';
import Login from '../components/login';
import AuthenticatedRoute from './AuthenticatedRoute';

const Routes: React.FunctionComponent = () => (
  <Switch>
    <NotAuthenticatedRoute exact path='/login' component={Login} />
    <AuthenticatedRoute path='' component={Main} />
  </Switch>
);

export default Routes;
