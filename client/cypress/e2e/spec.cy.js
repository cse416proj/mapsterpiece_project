describe('template spec', () => {
  it('register user', () => {
    cy.visit('/');

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#prompt > .flex-row > :nth-child(1)').click();
    cy.get('#\\:r1\\:').clear('Mappy');
    cy.get('#\\:r1\\:').type('Mappy');
    cy.get('#\\:r3\\:').clear('mappy1234@gmail.com');
    cy.get('#\\:r3\\:').type('mappy1234@gmail.com');
    cy.get('#\\:r5\\:').clear('mappy@');
    cy.get('#\\:r5\\:').type('mappy@');
    cy.get('#\\:r7\\:').clear('mappy@');
    cy.get('#\\:r7\\:').type('mappy@');
    cy.get('#filled-btn').click();
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('login user', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('mappy1234@gmail.com');
    cy.get('#\\:r1\\:').type('mappy1234@gmail.com');
    cy.get('#\\:r3\\:').clear('mappy@');
    cy.get('#\\:r3\\:').type('mappy@');
    cy.get('#filled-btn').click();
    /* ==== End Cypress Studio ==== */
  })

  it('dropdown menu test', ()=>{
    cy.visit('/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="PersonIcon"]').click();
    cy.get('.Mui-focusVisible').click();
    cy.get('[data-testid="PersonIcon"]').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    /* ==== End Cypress Studio ==== */
  })
})