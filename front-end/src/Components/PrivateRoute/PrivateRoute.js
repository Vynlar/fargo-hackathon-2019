import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'Components/AuthContext';

const PrivateRoute = props => {
  const auth = useAuth();
  return auth.isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  ...Route.propTypes,
};

export default PrivateRoute;
