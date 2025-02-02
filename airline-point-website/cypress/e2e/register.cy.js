describe('Register Page', () => {
    const ORIGIN_URL = 'http://localhost:3000';
  
    beforeEach(() => {
      
      cy.window().then((win) => {
        win.localStorage.clear();
      });
    });
  
    it('should load the registration form with all required fields', () => {
      cy.visit(`${ORIGIN_URL}/register`);
  

      cy.get('h2').contains('Register').should('be.visible');
      cy.get('h5').contains('Enter information below:').should('be.visible');
  
     
      cy.get('input#userName').should('exist');
      cy.get('input#password').should('exist');
      cy.get('input#password2').should('exist');
      cy.get('input#email').should('exist');
  

      cy.get('input#nationality').should('exist');
      cy.get('input#origin').should('exist');
      cy.get('input#preferenceCarrier').should('exist');
      cy.get('input#preferenceAlliance').should('exist');
  

      cy.get('button[type="submit"]').contains('Register').should('be.visible');
    });
  
    it('should fail to register of name exist and wrong password', () => {
      cy.visit(`${ORIGIN_URL}/register`);
  
      // Name is aldy taken
      cy.get('input#userName').type('test');
      cy.get('input#password').type('Password123!');
      cy.get('input#password2').type('Password123!');
      cy.get('input#email').type('newuser@example.com');
  

      cy.get('input#nationality').clear().type('United States of America');
      cy.get('input#origin').clear().type('YYZ - Toronto Pearson International Airport, Mississauga, CA');
  

      cy.get('input#preferenceCarrier').type('Delta');
      cy.get('input#preferenceAlliance').type('SkyTeam');
  
    
      cy.get('button[type="submit"]').click();

      cy.get('.alert-danger').contains('User name already taken').should('be.visible');

      cy.reload();

      cy.get('input#userName').type('newUser');
      cy.get('input#password').type('Password123!');
      cy.get('input#password2').type('DifferentPassword!');
      cy.get('input#email').type('newuser@example.com');
  

      cy.get('input#nationality').clear().type('United States of America');
      cy.get('input#origin').clear().type('YYZ - Toronto Pearson International Airport, Mississauga, CA');
  

      cy.get('button[type="submit"]').click();
  

      cy.get('.alert-danger').contains('Passwords do not match').should('be.visible');
  
    });

    
  });
  