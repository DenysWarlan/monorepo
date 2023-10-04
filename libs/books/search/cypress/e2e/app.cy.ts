describe('books-search', () => {
  beforeEach(() => cy.visit('/search'));

  it('should be visible search input', () => {
    cy.get('#searchInput').should('be.visible');
  });

  it('should be visible search reset button and search button', () => {
    cy.get('#searchInput').type('Shakespeare');

    cy.get('#reset').should('be.visible');
    cy.get('#search').should('be.visible');
  });

  it('should be empty search value after reset', () => {
    cy.get('#searchInput').type('Shakespeare');

    cy.get('#reset').click({force: true});

    cy.get('#searchInput').should('have.value', '');
  });

  it('should be visible list and pagination when search success', () => {
    cy.get('#searchInput').type('Shakespeare');

    cy.get('#search').click({force: true});

    cy.get('monorepo-books-list').should('be.visible');
    cy.get('monorepo-pagination').should('be.visible');
    cy.get('monorepo-book-item').should('be.visible');
  });

  it('should be visible info empty list when search success and total books equal 0', () => {
    cy.get('#searchInput').type('testetw2342345rwerwe');

    cy.get('#search').click({force: true});

    cy.get('#emptyBooksList').should('be.visible')
  });
});
