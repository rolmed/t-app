import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';

interface NotAuthenticatedRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const NotAuthenticatedRoute = ({ component: Component, ...rest }: NotAuthenticatedRouteProps) => {
  const { authToken } = useSelector((state: ApplicationState) => {
    return {
      authToken: state.login.authToken,
    };
  });

  const renderComponent = useCallback(
    (props) => {
      return authToken ? <Redirect to='' {...props} /> : <Component {...props} />;
    },
    [Component, authToken],
  );

  return <Route {...rest} render={renderComponent} />;
};

export default NotAuthenticatedRoute;
