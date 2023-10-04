import {generateEmailAddress} from '../support/app.po';

describe('auth-register', () => {
  beforeEach(() => cy.visit('/register'));

  it('should disable submit button when login form empty', () => {
    cy.get('[formControlName="name"]').should('have.value', '');
    cy.get('[formControlName="email"]').should('have.value', '');
    cy.get('[formControlName="password"]').should('have.value', '');

    cy.get('.submit').should('be.disabled');
  });

  it('should show email incorrect error', () => {
    cy.get('[formControlName="email"]').type('test');
    cy.get('[formControlName="password"]').type('ttt');
    cy.get('mnp-register').click({force: true});

    cy.get('#EmailErrorForm').should('be.visible');
    cy.get('#PasswordErrorForm').should('be.visible');
  });

  it('should route to login view when click login link', () => {

    cy.get('.btn-link').click({force: true});

    cy.url().should('include','/login');
  });

  it('should route to home if register error', () => {
    cy.get('[formControlName="name"]').type('test test');
    cy.get('[formControlName="email"]').type('denis.varla95+test1@gmail.com');
    cy.get('[formControlName="password"]').type('Test123!');

    cy.get('.submit').click({force: true});


    cy.get('#errorMessage').should('be.visible');
  });

  it('should route to home if register success', () => {
    cy.get('[formControlName="name"]').type('test test');
    cy.get('[formControlName="email"]').type(generateEmailAddress('denis.varla95+test1@gmail.com'));
    cy.get('[formControlName="password"]').type('Test123!');

    cy.get('.submit').click({force: true});


    cy.url().should('include','/login');
  });
});
