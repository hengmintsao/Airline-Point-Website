describe('MainNav and Airport Distance Calculator', () => {
    const BASE_URL = 'https://airline-point-website-server.vercel.app';
    const ORIGIN_URL = 'http://localhost:3000';
    const TEST_USER = 'test';
    const TEST_PASSWORD = '1234';
  
    
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.clear();
      });
    });
  
    describe('Main Navigation', () => {
      it('Logs in using the real API and verifies protected links', () => {
        
        cy.request('POST', `${BASE_URL}/api/user/login`, {
          userName: TEST_USER,
          password: TEST_PASSWORD,
        }).then((response) => {
         
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('token');
  
          const realToken = response.body.token;
  
      
          cy.visit(ORIGIN_URL);
          
          cy.window().then((win) => {
            win.localStorage.setItem('access_token', realToken);
            const storedToken = win.localStorage.getItem('access_token');
            expect(storedToken).to.eq(realToken);
          });
  
        
          cy.reload();
  
         
          cy.contains('Airlines').should('be.visible');
          cy.contains('Airport Calculator').should('be.visible');
          cy.contains('Mile Cost Calculator').should('be.visible');
        });
      });
    });
  
    describe('Airport Distance Calculator', () => {
      beforeEach(() => {
        
        cy.request('POST', `${BASE_URL}/api/user/login`, {
          userName: TEST_USER,
          password: TEST_PASSWORD,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('token');
  
          const realToken = response.body.token;
  
         
          cy.visit(ORIGIN_URL);
          cy.window().then((win) => {
            win.localStorage.setItem('access_token', realToken);
            const storedToken = win.localStorage.getItem('access_token');
            expect(storedToken).to.eq(realToken);
          });
  
         
          cy.reload();
  
          
          cy.visit(`${ORIGIN_URL}/calculator`);
        });
      });
  
      it('Displays an error when submitting without inputs', () => {
       
        cy.contains('Submit').should('be.visible').click();
  
        
        cy.contains('Error: Please select both Origin and Destination airports.')
          .should('be.visible');
      });
  
      it('Submits successfully with valid inputs', () => {
        
        cy.get('input[name="origin"]').type('JFK');
        cy.get('input[name="dest"]').type('LAX');
        
        // click swap icon
        cy.get('.swap-icon').should('be.visible').click();

        // After click swap icon, elements swap
        cy.get('input[name="origin"]').should('have.value', 'LAX');
        cy.get('input[name="dest"]').should('have.value', 'JFK');

        cy.contains('Submit').should('be.visible').click();
  
        
        cy.contains('Error: Please select both Origin and Destination airports.')
          .should('not.exist');
        cy.contains('The distance between the two airports is').should('be.visible');
      });
    });
  });
  