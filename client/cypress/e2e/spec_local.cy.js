describe('Mapsterpiece local tests', () => {
  // bob's account (already registered) :
  // bobDD@gmail.com
  // ThisIsAPassword
  it('register user fail', () => {
    cy.visit('http://localhost:3000');
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
  })

  it('login user fail', function() {
    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('bobDD@gmail.com');
    cy.get('#\\:r1\\:').type('bobDD@gmail.com');
    cy.get('#\\:r3\\:').clear('ThisIsAnotherPassword');
    cy.get('#\\:r3\\:').type('ThisIsAnotherPassword');
    cy.get('#filled-btn').click();
  })

  it('login-logout user success', function() {
    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('bobDD@gmail.com');
    cy.get('#\\:r1\\:').type('bobDD@gmail.com');
    cy.get('#\\:r3\\:').clear('ThisIsAPassword');
    cy.get('#\\:r3\\:').type('ThisIsAPassword');
    cy.get('#filled-btn').click();
    cy.get('#initialsIcon').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.get('#logo').click();
  })

  it('dropdown menu test', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="PersonIcon"]').click();
    cy.get('.Mui-focusVisible').click();
    cy.get('[data-testid="PersonIcon"]').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.get('#logo').click();
  })

  it('user create map fail', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('b');
    cy.get('#\\:r1\\:').type('bobDD@gmail.com');
    cy.get('#\\:r3\\:').clear('T');
    cy.get('#\\:r3\\:').type('ThisIsAPassword');
    cy.get('#filled-btn').click();
    cy.get('#home-navigation-card > :nth-child(1)').click();
    cy.get('#title-input').clear('h');
    cy.get('#title-input').type('hello map');
    cy.get('#upload-button').click();
    cy.get('#dialog-yes-button').click();
  })


  it('user create post fail', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('b');
    cy.get('#\\:r1\\:').type('bobDD@gmail.com');
    cy.get('#\\:r3\\:').clear('T');
    cy.get('#\\:r3\\:').type('ThisIsAPassword');
    cy.get('#filled-btn').click();
    cy.get('#home-navigation-card > :nth-child(1)').click();
    cy.get('#tab').click();
    cy.get('#title-input').clear('BD post');
    cy.get('#title-input').type('BD post');
    cy.get('#upload-button').click();
    cy.get('#title-input').click();
    cy.get('#content').click();
    cy.get('#upload-button').click();
  })

  it('user view owned published map comments, add a comment', ()=>{
    // click on the first card at home screen

    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('b');
    cy.get('#\\:r1\\:').type('bobDD@gmail.com');
    cy.get('#\\:r3\\:').clear('T');
    cy.get('#\\:r3\\:').type('ThisIsAPassword');
    cy.get('#filled-btn').click();
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .MuiStack-root').click();
    cy.get('.map-screen-container > .MuiToolbar-root > .MuiButtonBase-root').click();
    cy.get('.MuiInputBase-input').clear('h');
    cy.get('.MuiInputBase-input').type('hello');
    cy.get('#comment-submit-btn').click();
    cy.get('[data-testid="CloseIcon"]').click();
    cy.get('.MuiButton-text').click();
  })

  it('user view owned unpublished map, edit color', ()=>{
    // click on the 2nd card at home screen

    cy.visit('http://localhost:3000');
    cy.get('[style="margin-left: 2.5vw;"]').click();
    cy.get('#\\:r1\\:').clear('b');
    cy.get('#\\:r1\\:').type('bobDD@gmail.com');
    cy.get('#\\:r3\\:').clear('T');
    cy.get('#\\:r3\\:').type('ThisIsAPassword');
    cy.get('#filled-btn').click();
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > :nth-child(1)').click();
    cy.get('[title="#73D8FF"]').click();
    cy.get('[d="M580 138L583 138L592 132L607 136L611 126L617 128L620 130L621 133L625 135L631 133L639 138L645 139L655 134L658 136L662 136L658 143L659 145L666 144L671 148L664 150L653 157L648 156L648 160L644 165L636 166L629 170L627 168L620 166L604 165L601 159L599 159L596 156L589 155L589 149L587 145L583 144L580 141z"]').click();
    cy.get('[title="#FDA1FF"]').click();
    cy.get('[fill="#73d8ff"]').click();
  })
})