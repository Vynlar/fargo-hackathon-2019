describe('User form', () => {
  it('should be able to edit a user', function() {
    cy.seed();
    cy.login();

    cy.newUser().then(user => {
      cy.visit(`/private/user/${user.id}`);

      cy.contains(`${user.first_name} ${user.last_name}`);
      cy.contains('First name')
        .find('input')
        .clear()
        .type('Anewname');

      cy.contains('Save').click();

      cy.contains(`Anewname ${user.last_name}`);
      cy.visit('/private');
      cy.contains(`Anewname ${user.last_name}`);
    });
  });
});
