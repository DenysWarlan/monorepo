describe('auth-login', () => {
  beforeEach(() => {
    cy.visit(`/login`)
  });

  it('should disable submit button when login form empty', () => {
    cy.get('.action-email').should('have.value', '');
    cy.get('.action-password').should('have.value', '');

    cy.get('.submit').should('be.disabled');
  });

  it('should show email incorrect error', () => {
    cy.get('.action-email').type('test');
    cy.get('.action-password').type('ttt');
    cy.get('mnp-login').click({force: true});

    cy.get('#EmailErrorForm').should('be.visible');
    cy.get('#PasswordErrorForm').should('be.visible');
  });

  it('should route to register view when click register link', () => {

    cy.get('.btn-link').click({force: true});

    cy.url().should('include','/auth/register');
  });

  it('should error info if login error', () => {
    cy.get('.action-email').type('test@te3.test');
    cy.get('.action-password').type('testtestowy');

    cy.get('.submit').click({force: true});

    cy.get('#errorMessage').should('be.visible');
  });

  it('should route to home if login success', () => {
    cy.get('.action-email').type('denis.varla95+test@gmail.com');
    cy.get('.action-password').type('Test123!');

    cy.get('.submit').click({force: true});


    cy.url().should('include','/search');
  });
});
