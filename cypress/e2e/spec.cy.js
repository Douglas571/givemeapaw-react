describe('empty spec', () => {
  let user = {
    username: 'douglassocorro1@gmail.com',
    password: '123456789',
  };

  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit('http://localhost:5173');
  });

  it('passes', () => {
    cy.get('[data-test="appbar-menu"]').click();
    cy.contains('Iniciar Sesión').click();

    cy.get('[data-test="login-form"] input[name="email"]')
      .type(user.username);

    cy.get('[data-test="login-form"] input[name="password"]')
      .type(user.password);

    cy.contains('Iniciar Sesión').click();
  });
});
