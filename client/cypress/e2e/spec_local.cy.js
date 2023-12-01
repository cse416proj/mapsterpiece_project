describe('Mapsterpiece local tests', () => {
  // bob's account (already registered) :
  // bobDD@gmail.com
  // ThisIsAPassword
  it('register user fail', () => {
    cy.visit('http://localhost:3000');
    cy.get('.createAccount').click();
    cy.url().should('include', '/register');
    cy.get('input[name = "firstName"]').clear('Bob');
    cy.get('input[name = "firstName"]').type('Bob');
    cy.get('input[name = "lastName"]').clear('Dylan');
    cy.get('input[name = "lastName"]').type('Dylan');
    cy.get('input[name = "userName"]').clear('BobaKing');
    cy.get('input[name = "userName"]').type('BobaKing');
    cy.get('input[name = "email"]').clear('bobDD@gmail.com');
    cy.get('input[name = "email"]').type('bobDD@gmail.com');
    cy.get('input[name = "password"]').clear('ThisIsAPassword');
    cy.get('input[name = "password"]').type('ThisIsAPassword');
    cy.get('input[name = "confirmPassword"]').clear('ThisIsAnotherPassword');
    cy.get('input[name = "confirmPassword"]').type('ThisIsAnotherPassword');
    cy.get('button[type = "submit"]').click();
    cy.url().should('include', '/register');
    // cy.get('#auth-alert').should('be.visible').should('contain', 'Please enter the same password twice.');
  })

  it('login user fail', function() {
    cy.visit('http://localhost:3000');
    cy.get('.login').click();
    cy.url().should('include', '/login');
    cy.get('input[name = "email"]').clear('bobDD@gmail.com');
    cy.get('input[name = "email"]').type('bobDD@gmail.com');
    cy.get('input[name = "password"]').clear('ThisIsAnotherPassword');
    cy.get('input[name = "password"]').type('ThisIsAnotherPassword');
    cy.get('button[type = "submit"]').click();
    cy.url().should('include', '/login');
    // cy.get('#auth-alert').should('be.visible').should('contain', 'Wrong email or password provided.');
  })

  it('login-logout user success', function() {
    cy.visit('http://localhost:3000');
    cy.get('.login').click();
    cy.url().should('include', '/login');

    cy.get('input[name = "email"]').clear('bobDD@gmail.com');
    cy.get('input[name = "email"]').type('bobDD@gmail.com');
    cy.get('input[name = "password').clear('ThisIsAPassword');
    cy.get('input[name = "password').type('ThisIsAPassword');
    cy.get('button[type = "submit"]').click();
    cy.wait(1000);
    // cy.get('#auth-alert').should('contain', 'Login success! Now redirecting...')
    // cy.wait(1000);
    cy.get('#initialsIcon').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.get('#logo').click();
  })

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

  it('user create map fail', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('.login').click();
    cy.url().should('include', '/login');

    cy.get('input[name = "email"]').clear('bobDD@gmail.com');
    cy.get('input[name = "email"]').type('bobDD@gmail.com');
    cy.get('input[name = "password').clear('ThisIsAPassword');
    cy.get('input[name = "password').type('ThisIsAPassword');
    cy.get('button[type = "submit"]').click();
    cy.wait(1000);
    // cy.get('#auth-alert').should('contain', 'Login success! Now redirecting...')
    // cy.wait(1000);

    cy.get('.CREATE').click();
    cy.url().should('include', '/create');
    cy.wait(1000);

    cy.get('#title-input').clear('hello map');
    cy.get('#title-input').type('hello map');
    cy.get('#upload-button').click();
    cy.get('.modal-box')
    cy.get('#dialog-yes-button').click();
  })

  it('user create post fail', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('.login').click();
    cy.url().should('include', '/login');

    cy.get('input[name = "email"]').clear('bobDD@gmail.com');
    cy.get('input[name = "email"]').type('bobDD@gmail.com');
    cy.get('input[name = "password').clear('ThisIsAPassword');
    cy.get('input[name = "password').type('ThisIsAPassword');
    cy.get('button[type = "submit"]').click();
    // cy.get('#auth-alert').should('contain', 'Login success! Now redirecting...')
    cy.wait(1000);

    cy.get('.CREATE').click();
    cy.url().should('include', '/create');
    cy.wait(1000);

    cy.get('#tab').click();
    cy.get('#title-input').clear('BD post');
    cy.get('#title-input').type('BD post');
    cy.get('#upload-button').click();
    cy.url().should('include', '/create');
  })

  it('user view owned unpublished map, edit color', ()=>{
    // click on the 2nd card at home screen

    cy.visit('http://localhost:3000');
    cy.get('.login').click();
    cy.url().should('include', '/login');

    cy.get('input[name = "email"]').clear('bobDD@gmail.com');
    cy.get('input[name = "email"]').type('bobDD@gmail.com');
    cy.get('input[name = "password').clear('ThisIsAPassword');
    cy.get('input[name = "password').type('ThisIsAPassword');
    cy.get('button[type = "submit"]').click();
    // cy.get('#auth-alert').should('contain', 'Login success! Now redirecting...')
    cy.wait(1000);

    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root').click();
    cy.get('[title="#73D8FF"]').click();
    cy.get('[fill="#f44e3b"]').click();
    cy.get('[title="#F44E3B"] > div').click();
    cy.get('[fill="#73d8ff"]').click();
  })

  it('user view owned published map comments, add a comment', ()=>{
    // click on the first card at home screen
    cy.visit('http://localhost:3000');
    cy.get('.login').click();
    cy.url().should('include', '/login');

    cy.get('input[name = "email"]').clear('bobDD@gmail.com');
    cy.get('input[name = "email"]').type('bobDD@gmail.com');
    cy.get('input[name = "password').clear('ThisIsAPassword');
    cy.get('input[name = "password').type('ThisIsAPassword');
    cy.get('button[type = "submit"]').click();
    // cy.get('#auth-alert').should('contain', 'Login success! Now redirecting...')
    cy.wait(1000);

    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .MuiStack-root').click();
    cy.get('#open-comment').click();

    cy.get('input[type="text"]').click();
    cy.get('.MuiInputBase-input').clear('hello');
    cy.get('.MuiInputBase-input').type('hello');
    cy.get('#comment-submit-btn').click();
    cy.get('#close-comment').click();
    cy.get('#back').click();
  })
})