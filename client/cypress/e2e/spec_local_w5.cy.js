describe('Mapsterpiece local tests', () => {
    // bob's account (already registered) :
    // bobDD@gmail.com
    // ThisIsAPassword

//   // pass
//   it('user view own search screen', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);

//     cy.get('.SEARCH').click();
//     cy.url().should('include', '/search');
//     cy.get('#owner-search-text');

//     cy.get('#ALL_MAPS_POSTS').click();
//     cy.get('#AllMaps').click();
//     cy.get('#AllPosts').click();
//   })

//   // pass
//   it('user view other search screen', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);

//     cy.get('.COMMUNITY').click();
//     cy.url().should('include', '/community');
//     cy.get('#community-text');
//     cy.get('#ALL_USERS').click();
//     cy.get(':nth-child(1) > #UserDynamicCard > .MuiCardContent-root').click();
//     cy.get('[data-testid="AddIcon"]').click();
//     cy.get('[data-testid="SearchIcon"]').click();
//     cy.get('#user-search-text');

//     cy.get('#ALL_MAPS_POSTS').click();
//     cy.get('#AllMaps').click();
//     cy.get('#AllPosts').click();
//   })

//   // pass
//   it('user search for own maps & posts', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);

//     cy.get('.SEARCH').click();
//     cy.url().should('include', '/search');
//     cy.get('#owner-search-text');

//     cy.get('#AllMaps').click();
//     cy.get('input[placeholder="Search by map title/tag..."]'). type("unpublished").type('{enter}');
//     cy.get('input[placeholder="Search by map title/tag..."]'). clear("unpublished");

//     cy.get('#AllPosts').click();
//     cy.get('input[placeholder="Search by post title/tag/content..."]'). type("sample").type('{enter}');
//     cy.get('input[placeholder="Search by post title/tag/content..."]'). clear("sample");
//   })

//   // pass
//   it('user view community screen', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);

//     cy.get('.COMMUNITY').click();
//     cy.url().should('include', '/community');
//     cy.get('#community-text');
//     cy.get('#ALL_USERS').click();
//     cy.get('#AllMaps').click();
//     cy.get('#AllPosts').click();
//   })

//   // pass
//   it('user sort maps', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);

//     cy.get('.COMMUNITY').click();
//     cy.url().should('include', '/community');
//     cy.get('#community-text');

//     cy.get('#AllMaps').click();
//     cy.get('[data-testid="SortIcon"]').click();
//     cy.get('#Alphabet\\ \\(A-Z\\)').click();
//     cy.wait(1000); 
//     cy.get('#maps-cards .map-title').invoke('text').then((mapTitles) => {
//       const sortedTitles = mapTitles.split('\n').sort();
//       expect(mapTitles).to.equal(sortedTitles.join('\n'));
//     });

//     cy.get('[data-testid="SortIcon"]').click();
//     cy.get('#Alphabet\\ \\(Z-A\\)').click();
//     cy.wait(1000); 
//     cy.get('#maps-cards .map-title').invoke('text').then((mapTitles) => {
//       const sortedTitlesDesc = mapTitles.split('\n').sort().reverse();
//       expect(mapTitles).to.equal(sortedTitlesDesc.join('\n'));
//     });
//   })

//   // pass
//   it('user sort posts', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);

//     cy.get('.COMMUNITY').click();
//     cy.url().should('include', '/community');
//     cy.get('#community-text');

//     cy.get('#AllPosts').click();
//     cy.get('[data-testid="SortIcon"]').click();
//     cy.get('#Alphabet\\ \\(A-Z\\)').click();
//     cy.wait(1000); 
//     cy.get('#posts-cards .post-title').invoke('text').then((postTitles) => {
//       const sortedTitles = postTitles.split('\n').sort();
//       expect(postTitles).to.equal(sortedTitles.join('\n'));
//     });

//     cy.get('[data-testid="SortIcon"]').click();
//     cy.get('#Alphabet\\ \\(Z-A\\)').click();
//     cy.wait(1000); 
//     cy.get('#posts-cards .post-title').invoke('text').then((postTitles) => {
//       const sortedTitlesDesc = postTitles.split('\n').sort().reverse();
//       expect(postTitles).to.equal(sortedTitlesDesc.join('\n'));
//     });
//   })

// =============================== more tests starts here =============================== 

//   it('user duplicate published map', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);
//   })

//   it('user duplicate unpublished map', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);
//   })

//   it('user edit heatmap', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);
//   })

//   it('user edit grad symbol map', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);
//   })

//   it('user edit pin map', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);
//   })

//   it('user edit choropleth map', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);
//   })

//   it('user delete map comment', ()=>{
//     // user login
//     cy.visit('http://localhost:3000');
//     cy.get('.login').click();
//     cy.url().should('include', '/login');

//     cy.get('input[name = "email"]').clear('bobDD@gmail.com');
//     cy.get('input[name = "email"]').type('bobDD@gmail.com');
//     cy.get('input[name = "password').clear('ThisIsAPassword');
//     cy.get('input[name = "password').type('ThisIsAPassword');
//     cy.get('button[type = "submit"]').click();
//     cy.wait(1000);
//   })

})