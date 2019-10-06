import React from 'react';
import { ApolloProvider as Provider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

import { logout, getToken } from 'Components/AuthContext';

// Set this to your graphql url
const BASE_URL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : '/';

/**
 * @description Injects the Authorization header into the
 */
const request = async operation => {
  const token = getToken();
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path, debugMessage }) => {
          if (
            typeof debugMessage === 'string' &&
            debugMessage.toLowerCase().includes('unauthenticated')
          ) {
            logout();
            console.log('Server error: Unauthenticated. Logging out.');
            return;
          }
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    new HttpLink({
      uri: BASE_URL,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
  request: async operation => {},
});

export const ApolloProvider = props => <Provider client={client} {...props} />;
