
// Test connect to localhost:3000
describe('Connect to localhost:3000', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
  })
})

// Test MainNav

describe('MainNav test', () =>{
  const Origin_URL = 'localhost:3000';

  const wrong_token = 'testing';


  beforeEach(() =>{
    cy.clearLocalStorage();
  });

it('Not yet login', () =>{
  cy.visit(Origin_URL);

  // Should be visible
  cy.contains('Home').should('be.visible');
  cy.contains('Register').should('be.visible');
  cy.contains('Login').should('be.visible');

  //Should not be visible
  cy.contains('Airlines').should('not.exist');
  cy.contains('Airport Calculator').should('not.exist');
  cy.contains('Mile Cost Calculator').should('not.exist');
  cy.contains('Comparsion').should('not.exist');
  cy.contains('history').should('not.exist');
  cy.contains('Logout').should('not.exist');
});


it('Test using wrong token, should not have logout, only with not login pages', () => {
  
  cy.visit(Origin_URL);
  cy.window().then((win) => {
    win.localStorage.setItem('access_token', wrong_token);
  });
  cy.reload();

  // Confirm "Logout" is not visible
  cy.contains('Logout').should('not.exist');


  // Check navbar is back to not-logged-in state
  cy.contains('Home').should('be.visible');
  cy.contains('Register').should('be.visible');
  cy.contains('Login').should('be.visible');
  cy.contains('Airlines').should('not.exist');
});
});

