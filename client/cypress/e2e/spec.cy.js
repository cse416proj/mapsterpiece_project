describe('template spec', () => {
  it('register user', () => {
    cy.visit('/')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#prompt > .flex-row > :nth-child(1)').click();
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('login user', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="margin-left: 2.5vw;"]').click();
    /* ==== End Cypress Studio ==== */
  })

  it('dropdown menu test', ()=>{
    cy.visit('/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('path').click();
    cy.get('.Mui-focusVisible').click();
    cy.get('[data-testid="PersonIcon"]').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    /* ==== End Cypress Studio ==== */
  })

})