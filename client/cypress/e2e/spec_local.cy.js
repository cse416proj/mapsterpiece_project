describe('Mapsterpiece local tests', () => {
  // bob's account (already registered) :
  // bobDD@gmail.com
  // ThisIsAPassword

  // // pass
  // it('register user fail', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.get('.createAccount').click();
  //   cy.url().should('include', '/register');
  //   cy.get('input[name = "firstName"]').clear('Bob');
  //   cy.get('input[name = "firstName"]').type('Bob');
  //   cy.get('input[name = "lastName"]').clear('Dylan');
  //   cy.get('input[name = "lastName"]').type('Dylan');
  //   cy.get('input[name = "userName"]').clear('BobaKing');
  //   cy.get('input[name = "userName"]').type('BobaKing');
  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password"]').clear('ThisIsAPassword');
  //   cy.get('input[name = "password"]').type('ThisIsAPassword');
  //   cy.get('input[name = "confirmPassword"]').clear('ThisIsAnotherPassword');
  //   cy.get('input[name = "confirmPassword"]').type('ThisIsAnotherPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.url().should('include', '/register');
  // })

  // // pass
  // it('login user fail', function() {
  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');
  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password"]').clear('ThisIsAnotherPassword');
  //   cy.get('input[name = "password"]').type('ThisIsAnotherPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.url().should('include', '/login');
  // })

  // // pass
  // it('login-logout user success', function() {
  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');

  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password').clear('ThisIsAPassword');
  //   cy.get('input[name = "password').type('ThisIsAPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.wait(1000);

  //   cy.get('#initialsIcon').click();
  //   cy.get('.MuiList-root > [tabindex="-1"]').click();
  //   cy.get('#logo').click();
  // })

  // // pass
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
  
  // // pass
  // it('user create map fail - no file format', ()=>{
  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');

  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password').clear('ThisIsAPassword');
  //   cy.get('input[name = "password').type('ThisIsAPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.wait(1000);

  //   cy.get('.MAP').click();
  //   cy.wait(1000);
  //   cy.url().should('include', '/create');
  //   cy.get('#title-input').clear('BD post');
  //   cy.get('#title-input').type('BD post');
  //   cy.get('#upload-button').click();
  //   cy.url().should('include', '/create');
  // })

  // // pass
  // it('user create map fail - no map title', ()=>{
  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');

  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password').clear('ThisIsAPassword');
  //   cy.get('input[name = "password').type('ThisIsAPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.wait(1000);

  //   cy.get('.MAP').click();
  //   cy.wait(1000);
  //   cy.url().should('include', '/create');

  //   cy.get(':nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
  //   cy.get('#add-tag-button').click();
  //   cy.get('#tag-input').clear('h');
  //   cy.get('#tag-input').type('hello{enter}');
  //   cy.get('#upload-button').click();
  //   cy.url().should('include', '/create');
  // })

  // //  pass
  // it('user create post fail - no post content', ()=>{
  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');

  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password').clear('ThisIsAPassword');
  //   cy.get('input[name = "password').type('ThisIsAPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.wait(1000);

  //   cy.get('.POST').click();
  //   cy.url().should('include', '/create');
  //   cy.get('#title-input').clear('BD post');
  //   cy.get('#title-input').type('BD post');
  //   cy.get('#upload-button').click();
  //   cy.url().should('include', '/create');
  // })

  // // pass
  // it('user create post fail - no post title', ()=>{
  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');

  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password').clear('ThisIsAPassword');
  //   cy.get('input[name = "password').type('ThisIsAPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.wait(1000);

  //   cy.get('.POST').click();
  //   cy.url().should('include', '/create');

  //   cy.get('[rows="7"]').clear("bp post content");
  //   cy.get('[rows="7"]').type("bp post content");
  //   cy.get('#add-tag-button').click();
  //   cy.get('#tag-input').clear('hello');
  //   cy.get('#tag-input').type('hello');
  //   cy.get('#upload-button').click();
  //   cy.url().should('include', '/create');
  // })

  // // pass
  // it('user view owned unpublished map, edit color', ()=>{
  //   // click on the 1st card at home screen

  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');

  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password').clear('ThisIsAPassword');
  //   cy.get('input[name = "password').type('ThisIsAPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.wait(1000);

  //   cy.get(':nth-child(1) > :nth-child(2) > .MuiPaper-root > .MuiCardContent-root').click();
  //   cy.get('[title="#F44E3B"]').click();
  //   cy.get('[fill="#73d8ff"]').click();
  //   cy.get('[title="#73D8FF"] > div').click();
  //   cy.get('[fill="#f44e3b"]').click();

  //   cy.get('.map-button-container > :nth-child(2)').click();
  //   cy.wait(1000);

  //   cy.url().should('include', '/');
  // })

  // // pass
  // it('user view owned published map comments, add a comment', ()=>{
  //   // click on the first card at home screen
  //   cy.visit('http://localhost:3000');
  //   cy.get('.login').click();
  //   cy.url().should('include', '/login');

  //   cy.get('input[name = "email"]').clear('bobDD@gmail.com');
  //   cy.get('input[name = "email"]').type('bobDD@gmail.com');
  //   cy.get('input[name = "password').clear('ThisIsAPassword');
  //   cy.get('input[name = "password').type('ThisIsAPassword');
  //   cy.get('button[type = "submit"]').click();
  //   cy.wait(1000);

  //   cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .MuiStack-root').click();
  //   cy.url().should('include', '/map-detail/');
  //   cy.get('#expand-comment-btn').click();
  //   cy.get('[rows="1"]').clear("hi");
  //   cy.get('[rows="1"]').type("hi");
  //   cy.get('#comment-submit-btn').click();
  //   cy.get('#back').click();
  // })
})