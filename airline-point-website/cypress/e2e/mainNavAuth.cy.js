describe('MainNav with Valid Token', () => {
    const BASE_URL = 'https://airline-point-website-server.vercel.app';
    const ORIGIN_URL = 'http://localhost:3000'; // Corrected protocol for localhost
    const TEST_USER = 'test';
    const TEST_PASSWORD = '1234';
  
    beforeEach(() => {
      // Clear localStorage before each test
      cy.window().then((win) => win.localStorage.clear());
    });
  
    it('Logs in using the real API and shows protected links', () => {
      // Step 1: Send login request to get a valid token
      cy.request('POST', `${BASE_URL}/api/user/login`, {
        userName: TEST_USER, // Match the backend's expected field name
        password: TEST_PASSWORD,
      }).then((response) => {
        // Validate the response and extract the token
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
  
        const realToken = response.body.token;
  
        // Step 2: Visit the app and set the token in localStorage
        cy.visit(ORIGIN_URL);
        cy.window().then((win) => {
          win.localStorage.setItem('access_token', realToken);
          const storedToken = win.localStorage.getItem('access_token');
          expect(storedToken).to.eq(realToken); // Ensure the token is correctly set
        });
  
        // Step 3: Reload the app so it picks up the token
        cy.reload();
  
        // Step 4: Verify visible menu links
        cy.contains('Airlines').should('be.visible');
        cy.contains('Airport Calculator').should('be.visible');
        cy.contains('Mile Cost Calculator').should('be.visible');
  
        // Open dropdown and verify menu items
        cy.contains(TEST_USER).click();
        cy.contains('Comparsion').should('be.visible');
        cy.contains('Search History').should('be.visible');
        cy.contains('Logout').should('be.visible');
      });
    });
  
    it('Logs out correctly and reverts to a not-logged-in state', () => {
      // Step 1: Log in and retrieve the token
      cy.request('POST', `${BASE_URL}/api/user/login`, {
        userName: TEST_USER,
        password: TEST_PASSWORD,
      }).then((response) => {
        const realToken = response.body.token;
  
        // Step 2: Visit the app and set the token in localStorage
        cy.visit(ORIGIN_URL);
        cy.window().then((win) => {
          win.localStorage.setItem('access_token', realToken);
        });
  
        // Step 3: Reload the app to apply the token
        cy.reload();
  
        // Step 4: Open the dropdown menu
        cy.contains(TEST_USER).click();
  
        // Step 5: Verify Logout is visible and click it
        cy.contains('Logout').should('be.visible').click();
  
        // Step 6: Verify the token is removed from localStorage
        cy.window().then((win) => {
          const token = win.localStorage.getItem('access_token');
          expect(token).to.be.null;
        });
  
        // Step 7: Verify the app reverts to a logged-out state
        cy.contains('Home').should('be.visible');
        cy.contains('Register').should('be.visible');
        cy.contains('Login').should('be.visible');
  
        // Ensure protected links are no longer visible
        cy.contains('Airlines').should('not.exist');
        cy.contains('Logout').should('not.exist');
      });
    });
  });
  