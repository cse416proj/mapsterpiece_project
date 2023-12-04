describe('Mapsterpiece local tests', () => {
  // bob's account (already registered) :
  // bobDD@gmail.com
  // ThisIsAPassword
  it('dropdown menu test', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('#icon').click();
    cy.get('li[tabindex="-1"]').click();
    cy.url().should('include', '/login');
    cy.get('#icon').click();
    cy.get('li[tabindex="0"]').click();
    cy.url().should('include', '/register');
    cy.get('#logo').click();
    cy.url().should('include', '/');
  })
})