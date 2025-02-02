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
      cy.visit(`${ORIGIN_URL}/costPerMile`, { timeout: 10000 });
      cy.wait(1000);
      cy.get('h2').contains('Mile Cost Calculator').should('be.visible');
    });
  
    it('should show validation errors if required fields are empty', () => {
      cy.visit(`${ORIGIN_URL}/costPerMile`, { timeout: 10000 });
      cy.wait(1000);
      cy.get('button[type="submit"]', { timeout: 10000 }).click();
      
      cy.get('.invalid-feedback').should('have.length.at.least', 1);
    });
  
    it('should allow user to select an airline and add mileage types', () => {
      cy.visit(`${ORIGIN_URL}/costPerMile`, { timeout: 10000 });
      cy.wait(1000);
  
      
      cy.get('select[name="airline"]').select(1);
      cy.get('select[name="type_1"]').should('not.be.disabled').select('1', { force: true });
      cy.get('input[name="typeNumber_1"]').type('5000');
      cy.get('input[name="typeCost_1"]').type('200');
      cy.get('button[type="submit"]', { timeout: 10000 }).click();
      cy.get('.pie-chart-container').should('be.visible');
      cy.get('.result-container').contains('Total Miles:').should('be.visible');
      cy.get('.result-container').contains('Cost Per Mile:').should('be.visible');
      
      cy.window().then((win) => {
        if (!win.localStorage.getItem('searchHistory')) {
          win.localStorage.setItem('searchHistory', JSON.stringify([]));
        }
      });
  
      
      cy.window().then((win) => {
        const history = Array(20).fill({ airline: 'Test Airline', history: [] });
        win.localStorage.setItem('searchHistory', JSON.stringify(history));
      });
  
      
      cy.reload();
      cy.wait(1000);
  
      
      cy.get('button[type="submit"]', { timeout: 10000 }).click();
  
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains(
          "You have reached the maximum limit of 20 history records. Please delete old records at 'Search History' to add new ones."
        );
      });
  
      
      
    });
  
    it('should allow adding multiple mileage types', () => {
      cy.visit(`${ORIGIN_URL}/costPerMile`, { timeout: 10000 });
      cy.wait(1000);
      cy.get('select[name="airline"]').select(1);
      cy.get('select[name="type_1"]').should('not.be.disabled').select('1', { force: true });
      cy.get('input[name="typeNumber_1"]').type('5000');
      cy.get('input[name="typeCost_1"]').type('200');
      cy.get('button.btn-secondary').should('be.visible').click();
      cy.get('select[name="type_2"]').should('not.be.disabled').select('1', { force: true });
      cy.get('input[name="typeNumber_2"]').type('5000');
      cy.get('input[name="typeCost_2"]').type('200');
      cy.get('button[type="submit"]', { timeout: 10000 }).click();
      cy.get('.pie-chart-container').should('be.visible');
      cy.get('.result-container').contains('Total Miles:').should('be.visible');
      cy.get('.result-container').contains('Cost Per Mile:').should('be.visible');
    });
  });
  