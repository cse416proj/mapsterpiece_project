describe('Mapsterpiece local tests', () => {
  it('register user fail', () => {
    cy.visit('http://localhost:3000');

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#prompt > .flex-row > :nth-child(1)').click();
    cy.get('#\\:r1\\:').clear('Bob');
    cy.get('#\\:r1\\:').type('Bob');
    cy.get('#\\:r3\\:').clear('Dylan');
    cy.get('#\\:r3\\:').type('Dylan');
    cy.get('#\\:r5\\:').clear('BobaKing');
    cy.get('#\\:r5\\:').type('BobaKing');
    cy.get('#\\:r7\\:').clear('bobDD@gmail.com');
    cy.get('#\\:r7\\:').type('bobDD@gmail.com');
    cy.get('#\\:r9\\:').clear('ThisIsAPassword');
    cy.get('#\\:r9\\:').type('ThisIsAPassword');
    cy.get('#\\:rb\\:').clear('ThisIsAnotherPassword');
    cy.get('#\\:rb\\:').type('ThisIsAnotherPassword');
    cy.get('#filled-btn').click();
    cy.get('#confirm-cancel-container > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
  })

  it('login user success', function() {
    cy.visit('http://localhost:3000');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('bobDD@gmail.com');
    cy.get('#\\:r1\\:').type('bobDD@gmail.com');
    cy.get('#\\:r3\\:').clear('ThisIsAPassword');
    cy.get('#\\:r3\\:').type('ThisIsAPassword');
    cy.get('#filled-btn').click();
    /* ==== End Cypress Studio ==== */
  })

  it('login user fail', function() {
    cy.visit('http://localhost:3000');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('mappy1234@gmail.com');
    cy.get('#\\:r1\\:').type('mappy1234@gmail.com');
    cy.get('#\\:r3\\:').clear('ThisIsAPassword');
    cy.get('#\\:r3\\:').type('ThisIsAPassword');
    cy.get('#filled-btn').click();
    cy.get('#confirm-cancel-container > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
  })
  
  it('dropdown menu test', ()=>{
    cy.visit('http://localhost:3000');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="PersonIcon"]').click();
    cy.get('.Mui-focusVisible').click();
    cy.get('[data-testid="PersonIcon"]').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.get('#logo').click();
    /* ==== End Cypress Studio ==== */
  })
})