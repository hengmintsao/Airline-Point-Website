describe('MainNav and Airlines Page', () => {
    const BASE_URL = 'https://airline-point-website-server.vercel.app';
    const ORIGIN_URL = 'http://localhost:3000';
    const TEST_USER = 'test';
    const TEST_PASSWORD = '1234';
  
    beforeEach(() => {
      cy.window().then((win) => win.localStorage.clear());
    });
  
    it('Logs in using the real API and displays protected links', () => {
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

        cy.contains(realToken.userName || TEST_USER).click();
        cy.contains('Search History').click();
        cy.url().should('include', '/history');
      });
    });
});