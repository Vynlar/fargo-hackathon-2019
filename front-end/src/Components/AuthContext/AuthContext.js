/*
Component used to store the current authentication state of the user.
*/
import React from 'react';

import { handleTokenChange } from 'Services/API';
import { client as apolloClient } from 'Services/apollo';

export const LOCALSTORAGE_KEY = 'auth_token';
const LOGOUT = 'LOGOUT_EVENT';

export const getToken = () => localStorage.getItem(LOCALSTORAGE_KEY);

const AuthContext = React.createContext();

// Call this function to logout
export const logout = () => {
  window.dispatchEvent(new Event(LOGOUT));
};

export const AuthProvider = props => {
  const [token, setToken] = React.useState(
    localStorage.getItem(LOCALSTORAGE_KEY)
  );

  React.useEffect(() => {
    // Listen for logout events. We do this to allow apollo to log us out automatically when it receives an "Unauthenticated" response.
    window.addEventListener(LOGOUT, () => {
      onLogout();
    });
  }, []);

  React.useEffect(() => {
    // Update axios with the latest token each time it changes
    handleTokenChange(token);
  }, [token]);

  function onLogin(newToken) {
    // Clear apollo query cache
    apolloClient.clearStore();

    // Store the token in localStorage
    localStorage.setItem(LOCALSTORAGE_KEY, newToken);

    // Add the token to the react store (will cause appropriate redirects)
    setToken(newToken);
  }

  // Don't call this directly. Instead use the logout function above.
  function onLogout() {
    // Clear apollo query cache
    apolloClient.clearStore();

    // Forget auth token
    localStorage.removeItem(LOCALSTORAGE_KEY);

    // Remove the token from the react store (will cause appropriate redirects)
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: token ? true : false,
        setToken: onLogin,
        logout: onLogout,
      }}
      {...props}
    />
  );
};

/**
 * @returns Object: {
 *   token: string,
 *   isLoggedIn: bool,
 *   setToken: (token) => void,
 *   logout: () => void,
 * }
 */
export const useAuth = () => React.useContext(AuthContext);
