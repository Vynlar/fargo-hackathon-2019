describe('User list', () => {
  it('should render a list of users that you can click on', () => {
    // This is a custom command defined in ./Support/commands.js
    cy.seed();
    cy.login();

    cy.visit('/private');

    cy.contains(Cypress.env('name')).click();

    cy.location('pathname').should('equal', '/private/user/1');
    cy.contains(Cypress.env('email'));
  });
});
