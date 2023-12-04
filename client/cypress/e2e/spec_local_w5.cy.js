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
//     cy.get('[data-testid="SearchRoundedIcon"]').click();
//     cy.wait(1000);

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
//     cy.get('input[placeholder="Search by map title..."]'). type("unpublished").type('{enter}');
//     cy.get('input[placeholder="Search by map title..."]'). clear("unpublished");

//     cy.get('#AllPosts').click();
//     cy.get('input[placeholder="Search by post title..."]'). type("sample").type('{enter}');
//     cy.get('input[placeholder="Search by post title..."]'). clear("sample");
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

// zian on this one
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
    
//     cy.get(':nth-child(4) > .MuiPaper-root > .MuiCardContent-root').click();
    
//     cy.url().should('include', '/map-edit');

//     cy.get('#profile-cards > div:nth-child(6)').click();
//     cy.get('li[data-value="HEATMAP"]').click();
//     cy.get('body').click();
//     cy.get(
//       '[d="M646 212L644 211L645 207L650 207L651 208L649 211zM563 132L563 130L565 129L562 122L570 119L572 112L577 113L579 111L579 107L581 107L585 103L585 106L588 109L592 110L594 114L594 120L601 121L604 124L606 124L609 130L625 131L632 133L634 135L641 131L649 130L653 126L653 121L658 122L667 116L676 113L671 109L664 110L663 108L667 101L670 102L674 100L679 85L686 84L691 86L696 94L698 101L703 103L708 110L712 110L714 108L719 107L718 111L716 112L716 117L714 121L708 121L707 132L705 129L704 131L699 133L700 135L696 134L688 141L679 145L683 139L681 137L674 143L669 145L675 151L679 148L684 152L679 153L678 155L675 156L674 159L677 161L682 170L682 172L680 173L682 179L673 193L665 198L650 203L649 206L647 204L648 203L639 201L639 198L635 197L624 200L625 203L623 203L623 201L619 202L617 200L618 198L616 197L616 194L613 195L613 191L616 189L616 184L614 183L614 181L609 181L610 179L608 177L596 183L591 181L588 184L587 182L579 181L567 174L566 175L562 173L558 167L560 167L559 161L548 150L545 141L548 139L553 139L554 137L563 133z"]'
//     ).click();
//     cy.get('.modal-dialog');

//     cy.get('[name="value"]').clear('100');
//     cy.get('#\\:r7\\:').type('100');
//     cy.get('#dialog-yes-button').click();

//     cy.get(
//       '[d="M583 104L581 107L579 107L579 111L577 113L572 112L570 119L562 122L565 129L563 130L563 132L556 129L550 130L546 128L544 129L544 131L537 130L537 132L531 135L530 138L528 136L525 136L523 129L520 126L511 127L502 119L494 121L494 136L489 132L484 134L485 131L481 129L480 125L478 124L481 123L481 120L486 120L486 114L481 113L475 116L473 115L474 113L472 110L470 110L467 107L470 98L473 101L474 98L479 93L484 93L493 98L497 96L505 98L509 97L510 95L506 91L511 87L508 83L529 77L531 75L537 76L537 81L540 80L544 82L544 84L547 84L554 79L553 81L563 96L564 94L568 97L572 95L578 102L582 101z"]'
//     ).click();

//     cy.get('[name="value"]').clear('7');
//     cy.get('[name="value"]').type('70');
//     cy.get('#dialog-yes-button').click();

//     // cy.get('.map-button-container > :nth-child(2)').click();
//     // cy.get(':nth-child(4) > .MuiPaper-root > .MuiCardContent-root').click();

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