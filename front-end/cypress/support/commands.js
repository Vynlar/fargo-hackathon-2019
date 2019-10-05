// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import gql from 'graphql-tag';
import { client } from 'Services/apollo';
import { LOCALSTORAGE_KEY } from 'Components/AuthContext';
import faker from 'faker';

Cypress.Commands.add('seed', () => {
  cy.exec('pushd ../back-end && php artisan migrate:refresh --seed');
});

Cypress.Commands.add('query', (query, variables = {}) => {
  return cy.wrap(client.query({ query, variables }));
});

Cypress.Commands.add('mutate', (mutation, variables = {}) => {
  return cy.wrap(client.mutate({ mutation, variables }));
});

Cypress.Commands.add(
  'login',
  (email = Cypress.env('email'), password = Cypress.env('password')) => {
    return cy
      .mutate(
        gql`
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
            }
          }
        `,
        { email, password }
      )
      .its('data.login.token')
      .then(token => {
        window.localStorage.setItem(LOCALSTORAGE_KEY, token);
      });
  }
);

Cypress.Commands.add(
  'newUser',
  ({ firstName, lastName, email, password } = {}, count = 1) => {
    return cy
      .mutate(
        gql`
          mutation CreateUser(
            $email: String!
            $first_name: String!
            $last_name: String!
            $password: String!
          ) {
            createUser(
              email: $email
              first_name: $first_name
              last_name: $last_name
              password: $password
            ) {
              id
              first_name
              last_name
              email
            }
          }
        `,
        {
          first_name: firstName || faker.name.firstName(),
          last_name: lastName || faker.name.lastName(),
          email: email || faker.internet.email(),
          password: password || faker.internet.password(),
        }
      )
      .its('data.createUser');
  }
);
