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

  /* ==== Test Created with Cypress Studio ==== */
  it('User home screen shows user owned maps and posts', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('ba');
    cy.get('#\\:r1\\:').type('banana@gmail.com');
    cy.get('#\\:r3\\:').clear();
    cy.get('#\\:r3\\:').type('12345678');
    cy.get('#filled-btn').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Able to view all published maps, all users, all posts from community screen', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('banana@gmail.com');
    cy.get('#\\:r1\\:').type('banana@gmail.com');
    cy.get('#\\:r3\\:').clear('12345678');
    cy.get('#\\:r3\\:').type('12345678');
    cy.get('#filled-btn').click();
    cy.get('#home-navigation-card > :nth-child(4)').click();
    cy.get('.css-1t8x7v1 > [data-testid="ps-menu-button-test-id"] > .ps-menu-label').click();
    cy.get('.ps-menu-root > :nth-child(1) > :nth-child(2) > :nth-child(1) > .ps-menu-label').click();
    cy.get('.ps-menu-root > :nth-child(1) > :nth-child(3) > :nth-child(1) > .ps-menu-label').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('view other user profile', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('banana@gmail.com');
    cy.get('#\\:r1\\:').type('banana@gmail.com');
    cy.get('#\\:r3\\:').clear('12345678');
    cy.get('#\\:r3\\:').type('12345678');
    cy.get('#filled-btn').click();
    cy.get('#home-navigation-card > :nth-child(4)').click();
    cy.get('.css-1t8x7v1 > [data-testid="ps-menu-button-test-id"] > .ps-menu-label').click();
    cy.get(':nth-child(1) > #UserDynamicCard > .MuiCardContent-root > .MuiTypography-root').click();
    /* ==== End Cypress Studio ==== */
  });
})