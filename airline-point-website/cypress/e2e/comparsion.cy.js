describe('CostPerMiles Calculator', () => {
    const BASE_URL = 'https://airline-point-website-server.vercel.app';
    const ORIGIN_URL = 'http://localhost:3000';
    const TEST_USER = 'test';
    const TEST_PASSWORD = '1234';
  
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.clear();
      });
  
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
          expect(win.localStorage.getItem('access_token')).to.eq(realToken);
        });
        cy.reload();
      });
    });

    it('should load the page successfully', () => {
        cy.visit(`${ORIGIN_URL}/comparsion`, { timeout: 10000 });
        cy.wait(1000);
        cy.get('h1').contains('Comparsion').should('be.visible');
      });
    
      it('should not display "Nothing Here" when some airlines are selected', () => {
        
        cy.visit(`${ORIGIN_URL}/comparsion`, { timeout: 10000 });
        cy.wait(1000);
        
        // test if airlinesData.length is not 0
        cy.contains('IATA Code').should('be.visible');
        cy.contains('No Airlines Selected').should('not.exist');
       
      });
}); 