describe('auth-login', () => {
  beforeEach(() => cy.visit('/'));

  it('should disable submit button when login form empty', () => {
    cy.get('.action-email').should('have.value', '');
    cy.get('.action-password').should('have.value', '');

    cy.get('.submit').should('be.disabled');
  });

  it('should show email incorrect error', () => {

    cy.get('.action-email').type('test');
    cy.get('.action-password').type('ttt');
    cy.get('mnp-login').click({force: true});

    cy.get('#errorEmail').should('be.visible');
    cy.get('#passwordMinlength').should('be.visible');
  });

  it('should route to register view when click register link', () => {

    cy.get('.btn-link').click({force: true});

    cy.visit('/auth/register');
  });
});
