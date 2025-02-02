const ORIGIN_URL = 'http://localhost:3000';
  
    beforeEach(() => {
      
      cy.window().then((win) => {
        win.localStorage.clear();
      });
    });
  
    it('should load the login form with all required fields', () => {
      cy.visit(`${ORIGIN_URL}/login`);
      cy.get('input#userName').should('exist');
      cy.get('input#password').should('exist');
      cy.get('button[type="submit"]').contains('Login').should('be.visible');
    });

    it('login fail test', () =>{
        cy.visit(`${ORIGIN_URL}/login`);
        cy.contains('button', 'Login').click();
        cy.get('.alert-danger').contains('Both username and password are required.').should('be.visible');
        cy.reload();
        cy.get('input#userName').type('test');
        cy.contains('button', 'Login').click();
        cy.get('.alert-danger').contains('Both username and password are required.').should('be.visible');
        cy.reload();
        cy.get('input#password').type('12345');
        cy.contains('button', 'Login').click();
        cy.get('.alert-danger').contains('Both username and password are required.').should('be.visible');
        cy.reload();
        cy.get('input#userName').type('test');
        cy.get('input#password').type('12345');
        cy.contains('button', 'Login').click();
        cy.get('.alert-danger').contains('Incorrect password for user test').should('be.visible');
    });

    it('login success test', () =>{
        cy.visit(`${ORIGIN_URL}/login`);
        cy.get('input#userName').type('test');
        cy.get('input#password').type('1234');
        cy.contains('button', 'Login').click();
    });