import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GetContexts } from '../../context/AuthProvider';
import Loading from '../Loading/Loading';

const PrivateRoute = ({ children, ...rest }) => {
  const { user,loading } = GetContexts();
  if (loading) {
    return <Loading />
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;