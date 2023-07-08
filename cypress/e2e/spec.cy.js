describe('login and regist', () => {

  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit('http://localhost:5173');
  });

  it('should regist', () => {
    const random = Date.now()
    const newUser = {
      name: 'test',
      surname: 'ing' + random,
      email: 'testing' + random + '@gmail.com',
      password: '123456789'
    }

    cy.get('[data-test="appbar-menu"]').click();
    cy.contains('Registrate').click();

    cy.get('[data-test="register-form"] input[name="name"]')
      .type(newUser.name);

    cy.get('[data-test="register-form"] input[name="surname"]')
      .type(newUser.surname);  

    cy.get('[data-test="register-form"] input[name="email"]')
      .type(newUser.email);

    cy.get('[data-test="register-form"] input[name="password"]')
      .type(newUser.password);

    cy.contains('Registrarce').click()

    cy.url().should('eq', 'http://localhost:5173/me')

  });

  it('should login and logout', () => {
    let user = {
      username: 'juancarlossocorro571@gmail.com',
      password: '123456789',
    };

    cy.get('[data-test="appbar-menu"]').click()
    cy.contains('Iniciar Sesión').click()

    cy.get('[data-test="login-form"] input[name="email"]')
      .type(user.username);

    cy.get('[data-test="login-form"] input[name="password"]')
      .type(user.password);

    cy.contains('Iniciar Sesión').click();

    // verify is change to "me" page
    cy.url().should('eq', 'http://localhost:5173/me')

    cy.get('[data-test="appbar-menu"]').click()
    cy.contains('Cerrar Sesión').click()

    // verify is change to "login" page
    cy.url().should('eq', 'http://localhost:5173/login')
  })

  // it('should delete account', () => {
    
  // })
});

/*
describe('navigate to campaigns page and open a campaign', () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit('http://localhost:5173');
  });

  it('should open the campaign page from home', () => {
    // navigate to the campaigns page
    cy.get('[data-test="campagins-button"').click()

    // verify that you are in campaigns page
    const new_url = cy.url().should('eq', "http://localhost:5173/campaigns")

    cy.get('[data-test="campaign-action"]').eq(0).click()


    

    // get the first campaign and open it

  })
})

*/