describe('Mapsterpiece online tests', () => {
/* ==== Test Created with Cypress Studio ==== */
    it('register user fail', () => {
        cy.visit('/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#prompt > .flex-row > :nth-child(1)').click();
        cy.get('#\\:r0\\:').clear('Bob');
        cy.get('#\\:r0\\:').type('Bob');
        cy.get('#\\:r1\\:').clear('Dylan');
        cy.get('#\\:r1\\:').type('Dylan');
        cy.get('#\\:r2\\:').clear('BobaKing');
        cy.get('#\\:r2\\:').type('BobaKing');
        cy.get('#\\:r3\\:').clear('bobDD@gmail.com');
        cy.get('#\\:r3\\:').type('bobDD@gmail.com');
        cy.get('#\\:r4\\:').clear('ThisIsAPassword');
        cy.get('#\\:r4\\:').type('ThisIsAPassword');
        cy.get('#\\:r5\\:').clear('ThisIsAnotherPassword');
        cy.get('#\\:r5\\:').type('ThisIsAnotherPassword');
        cy.get('#filled-btn').click();
        cy.get('#confirm-cancel-container > .MuiButtonBase-root').click();
        /* ==== End Cypress Studio ==== */
    })  

    it('login user success', function() {
        cy.visit('/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[style="margin-left: 2.5vw;"]').click();
        cy.get('#\\:r0\\:').clear('bobDD@gmail.com');
        cy.get('#\\:r0\\:').type('bobDD@gmail.com');
        cy.get('#\\:r1\\:').clear('ThisIsAPassword');
        cy.get('#\\:r1\\:').type('ThisIsAPassword');
        cy.get('#filled-btn').click();
        /* ==== End Cypress Studio ==== */
    })

    it('login user fail', function() {
        cy.visit('/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[style="margin-left: 2.5vw;"]').click();
        cy.get('#\\:r0\\:').clear('mappy1234@gmail.com');
        cy.get('#\\:r0\\:').type('mappy1234@gmail.com');
        cy.get('#\\:r1\\:').clear('ThisIsAPassword');
        cy.get('#\\:r1\\:').type('ThisIsAPassword');
        cy.get('#filled-btn').click();
        cy.get('#confirm-cancel-container > .MuiButtonBase-root').click();
        /* ==== End Cypress Studio ==== */
    })
  
    it('dropdown menu test', ()=>{
        cy.visit('/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('path').click();
        cy.get('.Mui-focusVisible').click();
        cy.get('[data-testid="PersonIcon"]').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
        cy.get('#logo').click();
        /* ==== End Cypress Studio ==== */
    })
})