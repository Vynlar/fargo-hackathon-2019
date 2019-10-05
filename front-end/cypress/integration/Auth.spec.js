import { LOCALSTORAGE_KEY } from '../../src/Components/AuthContext';

describe('Login form', () => {
  it('Submits correctly', () => {
    cy.seed();

    cy.visit('/login');

    // Create aliases for fields and buttons
    // These can be referenced later using the `@foo` syntax
    cy.get('[data-cy=email]').as('email');
    cy.get('[data-cy=password]').as('password');
    cy.get('[data-cy=submit]').as('submit');

    // Login
    cy.get('@email')
      .should('be.focused')
      .type('bob123@gmail.com');
    cy.get('@password').type('password');
    cy.get('@submit').click();

    // Redirects correctly
    cy.location('pathname').should('equal', '/private');

    // Go back to home page
    cy.visit('/');

    // Is logged in correctly
    cy.contains('Bobby Bobberson');

    // Stays logged in through refresh
    cy.reload();
    cy.get('[data-cy=logout]')
      .as('logout')
      .should('have.text', 'Logout');

    // Log out correctly
    cy.get('@logout').click();
    cy.get('[data-cy=login]').as('login');

    cy.reload();
    cy.get('@login');
  });

  it('should redirect to login if you are not logged in', () => {
    cy.visit('/private');

    cy.location('pathname').should('equal', '/login');
  });

  it('should redirect you if your token expires', () => {
    cy.login();
    cy.visit('/private');
    cy.location('pathname').should('equal', '/private');
    cy.contains(Cypress.env('name'));

    // Essentially invalidates the token
    cy.window().then(window =>
      window.localStorage.setItem(LOCALSTORAGE_KEY, 'something invalid')
    );
    cy.wait(100);
    cy.reload();
    cy.location('pathname').should('equal', '/login');
  });
});
