import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';

interface AuthenticatedRouteProps extends RouteProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

const AuthenticatedRoute = ({ component: Component, ...rest }: AuthenticatedRouteProps) => {
  const { authToken } = useSelector((state: ApplicationState) => {
    return {
      authToken: state.login.authToken,
    };
  });

  const renderComponent: RenderComponent = useCallback(
    (props) => (authToken ? <Component {...props} /> : <Redirect to='/login' {...props} />),
    [Component, authToken],
  );

  return <Route {...rest} render={renderComponent} />;
};

export default AuthenticatedRoute;
