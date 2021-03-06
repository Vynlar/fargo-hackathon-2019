import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import 'normalize.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'Services/apollo';

/* This theme file can be used to create consistent spacing, colors, and fonts across the app.
   See the `styled-system` theme documentation for more information on the format.
 */
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import { AuthProvider } from 'Components/AuthContext';
import PrivateRoute from 'Components/PrivateRoute';

import Home from 'Views/Home';
import Login from 'Views/Login';
import Register from 'Views/Register';
import Private from 'Views/Private';
import UserProfile from 'Views/UserProfile';
import Chat from 'Views/Chat';
import Main from 'Views/Main';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <ApolloProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute exact path="/main" component={Main} />
              <PrivateRoute
                exact
                path="/private/user/:userId"
                component={UserProfile}
              />
              <PrivateRoute exact path="/chat" component={Chat} />
            </Switch>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
