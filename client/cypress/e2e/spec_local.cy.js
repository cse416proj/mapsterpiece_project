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
  //   // cy.get('#auth-alert').should('contain', 'Login success! Now redirecting...')
  //   // cy.wait(1000);
  //   cy.get('#initialsIcon').click();
  //   cy.get('.MuiList-root > [tabindex="-1"]').click();
  //   cy.get('#logo').click();
  // })

  // pass
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
  //   // cy.get('#auth-alert').should('contain', 'Login success! Now redirecting...')
  //   // cy.wait(1000);

  //   cy.get('.CREATE').click();
  //   cy.url().should('include', '/create');
  //   cy.wait(1000);

  //   cy.get('#title-input').clear('hello map');
  //   cy.get('#title-input').type('hello map');
  //   cy.get('#upload-button').click();
  //   cy.get('.modal-box')
  //   cy.get('#dialog-yes-button').click();
  // })

  // pass
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

  //   cy.get('.CREATE').click();
  //   cy.url().should('include', '/create');
  //   cy.wait(1000);

  //   cy.get('body').click();
  //   cy.get('div[role="combobox"]').click();
  //   cy.get('li[data-value="GeoJSON"]').click();
  //   cy.get('#upload-button').click();
  //   cy.get('.modal-box');
  //   cy.get('#dialog-yes-button').click();
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

  //   cy.get('.CREATE').click();
  //   cy.url().should('include', '/create');
  //   cy.wait(1000);

  //   cy.get('#tab').click();
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

  //   cy.get('.CREATE').click();
  //   cy.url().should('include', '/create');
  //   cy.wait(1000);

  //   cy.get('#tab').click();
  //   cy.get('textarea[placeholder="Type post content here..."]').clear('BD post content');
  //   cy.get('textarea[placeholder="Type post content here..."]').type('BD post content');
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

  //   cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').click();
  //   cy.get('[title="#F44E3B"]').click();  // get red color
  //   cy.get('[fill="#73d8ff"]').click();   // fill in blue region
  //   cy.get('[title="#73D8FF"]').click();  // get blue color
  //   cy.get('[fill="#f44e3b"]').click();   // fill in red region
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

  //   cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .MuiStack-root').click();
  //   cy.url().should('include', '/map-detail/');
  //   cy.get('#expand-comment-btn').click();
  //   cy.get('[placeholder = "Enter your comment here..."]').clear("hi");
  //   cy.get('[placeholder = "Enter your comment here..."]').type("hi");
  //   cy.get('#comment-submit-btn').click();
  //   cy.get('[data-testid="CloseIcon"]').click();
  //   cy.get('#back').click();
  // })
})